# Codebase Task Proposals

## 1) Typo fix task
**Task:** Correct `REsponse` to `Response` in the `ResponseStream.finalResponse()` JSDoc comment.

**Why:** This typo reduces polish and can confuse API readers generated from source comments.

**Evidence:** `src/lib/responses/ResponseStream.ts` contains `REsponse` in the method comment.

## 2) Bug fix task
**Task:** Fix `ResponseStream.finalResponse()` to throw a response-specific error message (`...without producing a Response`) instead of the copied `ChatCompletion` message.

**Why:** The current error text is misleading for callers debugging response-stream failures.

**Evidence:** `finalResponse()` throws `stream ended without producing a ChatCompletion`.

## 3) Comment/documentation discrepancy task
**Task:** Align runtime requirements documentation with install-time/package metadata by either:
- adding an `engines.node` constraint in `package.json`, or
- adjusting the README wording so it is clearly advisory.

**Why:** README states Node.js 20+ is required, but `package.json` does not currently enforce runtime engines.

**Evidence:** Runtime requirement appears in README, while `package.json` lacks an `engines` field.

## 4) Test improvement task
**Task:** Add a regression test in `tests/lib/ResponseStream.test.ts` that validates the exact error text when `finalResponse()` is called before any final response is produced.

**Why:** Existing tests cover successful `finalResponse()` flows but not the failure-path message; this allowed the current copy/paste error to persist.

**Evidence:** Current tests call `finalResponse()` in success scenarios; no assertion for the failure message.
