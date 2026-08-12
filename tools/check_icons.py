#!/usr/bin/env python3
"""Sample pixels of generated icons to verify the logo geometry renders correctly."""
import os
import struct
import zlib

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "icons")


def decode(path):
    d = open(path, "rb").read()
    pos = 8
    idat = b""
    w = h = 0
    while pos < len(d):
        (length,) = struct.unpack(">I", d[pos:pos + 4])
        typ = d[pos + 4:pos + 8]
        data = d[pos + 8:pos + 8 + length]
        if typ == b"IHDR":
            w, h = struct.unpack(">II", data[:8])
        if typ == b"IDAT":
            idat += data
        pos += 12 + length
    raw = zlib.decompress(idat)
    stride = w * 4
    prev = bytearray(stride)
    rows = []
    for y in range(h):
        f = raw[y * (stride + 1)]
        line = bytearray(raw[y * (stride + 1) + 1:(y + 1) * (stride + 1)])
        if f == 1:
            for i in range(4, stride):
                line[i] = (line[i] + line[i - 4]) & 0xFF
        elif f == 2:
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 0xFF
        elif f == 3:
            for i in range(stride):
                a = line[i - 4] if i >= 4 else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 0xFF
        elif f == 4:
            for i in range(stride):
                a = line[i - 4] if i >= 4 else 0
                b = prev[i]
                c = prev[i - 4] if i >= 4 else 0
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 0xFF
        rows.append(bytes(line))
        prev = line
    return w, h, rows


def px(rows, w, h, nx, ny):
    x, y = int(nx * (w - 1)), int(ny * (h - 1))
    r = rows[y]
    return (r[x * 4], r[x * 4 + 1], r[x * 4 + 2], r[x * 4 + 3])


def main():
    w, h, rows = decode(os.path.join(OUT, "icon-512.png"))
    print("icon-512:", w, "x", h)
    checks = {
        "corner (0.02,0.02) [transparent]": px(rows, w, h, 0.02, 0.02),
        "card bg (0.5,0.2) [dark navy]": px(rows, w, h, 0.5, 0.20),
        "border top (0.5,0.12) [indigo]": px(rows, w, h, 0.5, 0.12),
        "bar1 (0.42,0.335) [cyan]": px(rows, w, h, 0.42, 0.335),
        "bar2 (0.42,0.44) [indigo]": px(rows, w, h, 0.42, 0.44),
        "bar3 (0.42,0.545) [fuchsia]": px(rows, w, h, 0.42, 0.545),
        "center (0.5,0.5) [dark, no bar]": px(rows, w, h, 0.5, 0.5),
    }
    for label, c in checks.items():
        print("  ", label, c)


if __name__ == "__main__":
    main()
