#!/usr/bin/env python3
"""Validate generated PNG icons: signature, dimensions, CRC, and a full decode."""
import struct
import zlib
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "icons")


def read_png(path):
    d = open(path, "rb").read()
    assert d[:8] == b"\x89PNG\r\n\x1a\n", "bad signature"
    pos = 8
    chunks = []
    while pos < len(d):
        (length,) = struct.unpack(">I", d[pos:pos + 4])
        typ = d[pos + 4:pos + 8]
        data = d[pos + 8:pos + 8 + length]
        (crc,) = struct.unpack(">I", d[pos + 8 + length:pos + 12 + length])
        assert crc == zlib.crc32(typ + data) & 0xFFFFFFFF, "bad CRC in " + typ.decode()
        chunks.append((typ, data))
        pos += 12 + length
    assert chunks[0][0] == b"IHDR"
    w, h, depth, ctype = struct.unpack(">IIBB", chunks[0][1][:10])
    idat = b"".join(c for t, c in chunks if t == b"IDAT")
    raw = zlib.decompress(idat)
    bpp = 4 if ctype == 6 else 3
    stride = w * bpp
    # de-filter (all filter types)
    prev = bytearray(stride)
    out = bytearray()
    for y in range(h):
        f = raw[y * (stride + 1)]
        line = bytearray(raw[y * (stride + 1) + 1:(y + 1) * (stride + 1)])
        if f == 1:
            for i in range(bpp, stride):
                line[i] = (line[i] + line[i - bpp]) & 0xFF
        elif f == 2:
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 0xFF
        elif f == 3:
            for i in range(stride):
                a = line[i - bpp] if i >= bpp else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 0xFF
        elif f == 4:
            for i in range(stride):
                a = line[i - bpp] if i >= bpp else 0
                b = prev[i]
                c = prev[i - bpp] if i >= bpp else 0
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 0xFF
        out += line
        prev = line
    assert len(out) == h * stride
    return w, h, depth, ctype, out


def main():
    for name in ("icon-192.png", "icon-512.png", "icon-180.png", "icon-maskable-512.png"):
        path = os.path.join(OUT, name)
        w, h, depth, ctype, pixels = read_png(path)
        print(name, "->", w, "x", h, "depth", depth, "ctype", ctype, "pixels", len(pixels), "OK")


if __name__ == "__main__":
    main()
