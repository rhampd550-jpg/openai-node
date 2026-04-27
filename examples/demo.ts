#!/usr/bin/env -S npm run tsn -T

import OpenAI from 'openai';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const openai = new OpenAI();
const initialModel = process.argv[2] ?? 'gpt-4.1-mini';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function printHelp(model: string) {
  console.log(`\nInteractive demo started (model: ${model})`);
  console.log('Type a prompt and press Enter.');
  console.log('Commands: /help, /model <name>, /clear, /history, /exit\n');
}

async function runInteractiveChat() {
  const rl = createInterface({ input, output });
  let model = initialModel;
  const messages: ChatMessage[] = [];

  printHelp(model);

  while (true) {
    const userInput = (await rl.question('you> ')).trim();

    if (!userInput) continue;

    if (userInput === '/exit') break;

    if (userInput === '/help') {
      printHelp(model);
      continue;
    }

    if (userInput === '/clear') {
      messages.length = 0;
      console.log('assistant> Conversation cleared.');
      continue;
    }

    if (userInput === '/history') {
      if (!messages.length) {
        console.log('assistant> No messages yet.');
        continue;
      }

      console.log('assistant> Conversation history:');
      for (const message of messages) {
        console.log(`  - ${message.role}: ${message.content}`);
      }
      continue;
    }

    if (userInput.startsWith('/model ')) {
      const nextModel = userInput.slice('/model '.length).trim();
      if (!nextModel) {
        console.log('assistant> Usage: /model <model-name>');
        continue;
      }
      model = nextModel;
      console.log(`assistant> Model updated to ${model}.`);
      continue;
    }

    messages.push({ role: 'user', content: userInput });

    const stream = await openai.chat.completions.create({
      model,
      messages,
      stream: true,
    });

    let assistantText = '';
    output.write('assistant> ');

    for await (const part of stream) {
      const token = part.choices[0]?.delta?.content || '';
      assistantText += token;
      output.write(token);
    }

    output.write('\n');

    if (assistantText.trim()) {
      messages.push({ role: 'assistant', content: assistantText.trim() });
    }
  }

  rl.close();
}

runInteractiveChat();
