#!/usr/bin/env python3
"""Generate PWA icons for AI Presales Academy (pure stdlib, no deps).

Draws the brand mark (dark rounded rect + indigo border + 3 gradient bars)
using an anti-aliased signed-distance-field renderer, then encodes PNGs
with zlib. Coordinates are normalized 0..1; the AA width is expressed in
pixels and converted to normalized units per icon size.
"""
import os
import struct
import zlib

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "icons")
os.makedirs(OUT, exist_ok=True)

BG = (13, 20, 40)        # #0d1428
BORDER = (129, 140, 248) # #818cf8
BARS = [(34, 211, 238), (129, 140, 248), (232, 121, 249)]  # cyan, indigo, fuchsia


def clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, v))


def rounded_rect_sdf(px, py, cx, cy, hw, hh, r):
    dx = abs(px - cx) - (hw - r)
    dy = abs(py - cy) - (hh - r)
    ox, oy = max(dx, 0.0), max(dy, 0.0)
    return (ox * ox + oy * oy) ** 0.5 + min(max(dx, dy), 0.0) - r


def coverage(d, aa):
    """AA coverage of the inside of a shape with SDF value d (negative inside)."""
    return clamp(0.5 - d / aa)


def blend(base, over, a):
    a = clamp(a)
    return tuple(round(base[i] * (1 - a) + over[i] * a) for i in range(3))


def render(size, maskable=False):
    """Render RGBA pixel rows for an icon."""
    aa = 1.6 / size  # edge softness in px, converted to normalized units
    if maskable:
        cx, cy, hw, hh, r, bw = 0.5, 0.5, 0.46, 0.46, 0.16, 0.055
        bar_h, bar_y0, bar_gap = 0.075, 0.335, 0.095
        bar_ws = (0.30, 0.30, 0.19)
    else:
        cx, cy, hw, hh, r, bw = 0.5, 0.5, 0.40, 0.40, 0.15, 0.06
        bar_h, bar_y0, bar_gap = 0.085, 0.335, 0.105
        bar_ws = (0.34, 0.34, 0.21)

    rows = []
    for y in range(size):
        row = bytearray()
        py = (y + 0.5) / size
        for x in range(size):
            px = (x + 0.5) / size
            d_outer = rounded_rect_sdf(px, py, cx, cy, hw, hh, r)
            d_inner = d_outer + bw  # shrunk by bw: negative only inside the ring's inner edge
            cov_inner = coverage(d_inner, aa)   # body fill
            cov_outer = coverage(d_outer, aa)   # body + ring
            cov_ring = cov_outer - cov_inner    # the border band (AA on both edges)

            col = (0, 0, 0)
            alpha = 0.0
            if cov_inner > 0:
                col = blend(col, BG, cov_inner)
                alpha = max(alpha, cov_inner)
            if cov_ring > 0:
                col = blend(col, BORDER, cov_ring)
                alpha = max(alpha, cov_ring)
            for i, bar_w in enumerate(bar_ws):
                by = bar_y0 + i * bar_gap
                d_bar = rounded_rect_sdf(px, py, cx, by, bar_w / 2, bar_h / 2, bar_h / 2 * 0.55)
                cov_bar = coverage(d_bar, aa)
                if cov_bar > 0:
                    col = blend(col, BARS[i], cov_bar)
                    alpha = max(alpha, cov_bar)
            row += bytes(col) + bytes([round(alpha * 255)])
        rows.append(bytes(row))
    return rows


def write_png(path, size, rows):
    def chunk(typ, data):
        c = struct.pack(">I", len(data)) + typ + data
        c += struct.pack(">I", zlib.crc32(typ + data) & 0xFFFFFFFF)
        return c

    raw = b"".join(b"\x00" + r for r in rows)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", ihdr)
    png += chunk(b"IDAT", zlib.compress(raw, 9))
    png += chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)


def main():
    specs = [
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
        ("icon-180.png", 180, False),
        ("icon-maskable-512.png", 512, True),
    ]
    for name, size, maskable in specs:
        path = os.path.join(OUT, name)
        write_png(path, size, render(size, maskable))
        print("wrote", path, os.path.getsize(path), "bytes")


if __name__ == "__main__":
    main()
