#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
skill_name="agent-skill"
source_dir="${repo_root}/skills/${skill_name}"
codex_home="${CODEX_HOME:-${HOME}/.codex}"
dest_root="${codex_home}/skills"
dest_dir="${dest_root}/${skill_name}"

if [[ ! -d "${source_dir}" ]]; then
  echo "Skill source not found: ${source_dir}" >&2
  exit 1
fi

mkdir -p "${dest_root}"
rm -rf "${dest_dir}"
cp -R "${source_dir}" "${dest_dir}"

echo "Imported ${skill_name} to ${dest_dir}"
echo "Restart Codex to pick up the imported skill."
