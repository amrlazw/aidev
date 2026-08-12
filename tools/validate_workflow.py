#!/usr/bin/env python3
"""Minimal structural validator for .github/workflows/deploy.yml.

Checks the classic YAML failure modes in hand-written GitHub Actions files:
tabs, inconsistent indentation, and required keys/actions.
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, ".github", "workflows", "deploy.yml")

REQUIRED_TOP = {"name", "on", "permissions", "concurrency", "jobs"}
REQUIRED_ACTIONS = [
    "actions/checkout@",
    "actions/configure-pages@",
    "actions/upload-pages-artifact@",
    "actions/deploy-pages@",
]
REQUIRED_PERMS = {"contents: read", "pages: write", "id-token: write"}


def main():
    text = open(PATH, encoding="utf-8").read()
    lines = text.splitlines()
    errors = []

    # 1. No tabs anywhere
    for i, ln in enumerate(lines, 1):
        if "\t" in ln:
            errors.append(f"line {i}: tab character found")

    # 2. Top-level keys (indent 0) must be the required set
    top = set()
    for ln in lines:
        if ln and not ln.startswith((" ", "#")) and ":" in ln:
            top.add(ln.split(":")[0].strip())
    missing = REQUIRED_TOP - top
    if missing:
        errors.append(f"missing top-level keys: {sorted(missing)}")

    # 3. Required permissions lines present
    body = " ".join(ln.strip() for ln in lines if not ln.startswith("#"))
    for p in REQUIRED_PERMS:
        if p not in body:
            errors.append(f"missing permission: '{p}'")

    # 4. Required actions present
    for a in REQUIRED_ACTIONS:
        if a not in text:
            errors.append(f"missing action: {a}")

    # 5. Indentation consistency: indent widths must be multiples of a single step
    indents = {len(ln) - len(ln.lstrip(" ")) for ln in lines if ln.strip() and not ln.lstrip().startswith("#")}
    indents.discard(0)
    if indents:
        step = min(indents)
        bad = [n for n in indents if n % step != 0]
        if bad:
            errors.append(f"indent widths not multiples of {step}: {sorted(bad)}")

    # 6. No trailing whitespace
    for i, ln in enumerate(lines, 1):
        if ln != ln.rstrip():
            errors.append(f"line {i}: trailing whitespace")

    if errors:
        print("FAIL")
        for e in errors:
            print("  -", e)
        raise SystemExit(1)
    print("PASS: workflow structure valid")
    print("  top-level keys:", ", ".join(sorted(top)))
    print("  indent step:", step if indents else "n/a")


if __name__ == "__main__":
    main()
