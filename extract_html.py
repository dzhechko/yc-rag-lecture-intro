#!/usr/bin/env python3
"""Extract HTML content from old index.tsx file"""

with open('old_seminar_content.txt', 'r') as f:
    lines = f.readlines()

# Find the HTML start and end
in_html = False
html_lines = []
indent_to_remove = '    '  # 4 spaces

for line in lines:
    if 'return c.html(`' in line:
        in_html = True
        continue
    elif in_html and line.strip() == '`)':
        break
    elif in_html:
        # Remove the indent
        if line.startswith(indent_to_remove):
            html_lines.append(line[len(indent_to_remove):])
        else:
            html_lines.append(line)

# Write to file
with open('seminar_yandex.html', 'w') as f:
    f.writelines(html_lines)

print(f"Extracted {len(html_lines)} lines of HTML to seminar_yandex.html")