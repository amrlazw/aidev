/* ============================================================
   AI Presales Academy — diagram definitions (one per module)
   Rendered as inline SVG by the renderer in app.js.
   Node: { id, x, y, w, h, icon, label, sub }  Edge: { a, b, label?, curve? }
   icon = name of a <symbol> in the index.html sprite (Lucide-style).
   ============================================================ */
window.DIAGRAMS = (function () {

  /* Auto-layout a horizontal chain of nodes, left → right. */
  function flow(items, prefix, startX, startY, w, h, gap) {
    var nodes = [], edges = [], x = startX;
    items.forEach(function (it, i) {
      var id = prefix + i;
      nodes.push({ id: id, x: x, y: startY, w: w, h: h, icon: it.icon, label: it.label, sub: it.sub });
      if (i > 0) edges.push({ a: prefix + (i - 1), b: id });
      x += w + gap;
    });
    return { nodes: nodes, edges: edges, width: x - gap + startX, height: startY + h + 14 };
  }

  return {

    /* M0 — the presales lifecycle (two rows) */
    m0: (function () {
      var row1 = flow(
        [{ icon: 'search', label: 'Discover' }, { icon: 'clipboard', label: 'Requirements' },
         { icon: 'layers', label: 'Architecture' }, { icon: 'ruler', label: 'Sizing' }],
        'a', 20, 20, 128, 56, 26);
      var row2 = flow(
        [{ icon: 'flask', label: 'Demo / PoC' }, { icon: 'file', label: 'Proposal' }, { icon: 'users', label: 'Handoff' }],
        'b', 20, 150, 128, 56, 26);
      return {
        nodes: row1.nodes.concat(row2.nodes),
        edges: row1.edges.concat(row2.edges, [{ a: 'a3', b: 'b0' }]),
        width: row1.width, height: 150 + 56 + 14,
        caption: 'The presales lifecycle — every deal moves through these seven stages. You own stages 1–6; delivery takes over at handoff.'
      };
    })(),

    /* M1 — what an LLM does */
    m1: (function () {
      var d = flow(
        [{ icon: 'message', label: 'Tokens in' }, { icon: 'hash', label: 'Embeddings' },
         { icon: 'brain', label: 'Attention ×N' }, { icon: 'dice', label: 'Next-token odds' },
         { icon: 'sparkles', label: 'Token out' }],
        'n', 20, 22, 128, 56, 26);
      d.caption = 'An LLM is a next-token predictor: embed the input, attend across it, then pick the most probable next token — and repeat.';
      return d;
    })(),

    /* M2 — RAG: ingestion lane + query lane */
    m2: (function () {
      var ingest = flow(
        [{ icon: 'folder', label: 'Sources' }, { icon: 'eye', label: 'Parse / OCR' },
         { icon: 'scissors', label: 'Chunk' }, { icon: 'hash', label: 'Embed' },
         { icon: 'database', label: 'Vector DB' }],
        'a', 20, 20, 128, 56, 26);
      var query = flow(
        [{ icon: 'message', label: 'User question' }, { icon: 'hash', label: 'Embed query' },
         { icon: 'search', label: 'Vector search' }, { icon: 'scale', label: 'Rerank' },
         { icon: 'bot', label: 'Prompt + LLM' }, { icon: 'check-circle', label: 'Grounded answer' }],
        'b', 20, 168, 128, 56, 26);
      return {
        nodes: ingest.nodes.concat(query.nodes),
        edges: ingest.edges.concat(query.edges, [{ a: 'a4', b: 'b2', label: 'top-k' }]),
        width: query.width, height: 168 + 56 + 14,
        caption: 'RAG = ingest once (top), retrieve at query time (bottom), and ground every answer in retrieved documents with citations.'
      };
    })(),

    /* M3 — model lifecycle loop */
    m3: (function () {
      var d = flow(
        [{ icon: 'book', label: 'Data' }, { icon: 'grad', label: 'Fine-tune (LoRA)' },
         { icon: 'flask', label: 'Evaluate' }, { icon: 'rocket', label: 'Deploy & serve' },
         { icon: 'chart', label: 'Monitor' }],
        'n', 20, 60, 128, 56, 26);
      d.edges.push({ a: 'n4', b: 'n0', curve: 'top', label: 'iterate' });
      d.height = 160;
      d.caption = 'The model lifecycle is a loop: fine-tune changes the model, RAG changes the input, and monitoring feeds the next iteration.';
      return d;
    })(),

    /* M4 — data ingestion pipeline */
    m4: (function () {
      var d = flow(
        [{ icon: 'folder', label: 'Sources' }, { icon: 'eye', label: 'Parse / OCR' },
         { icon: 'shield', label: 'Clean & PII' }, { icon: 'scissors', label: 'Chunk' },
         { icon: 'hash', label: 'Embed' }, { icon: 'database', label: 'Vector index' }],
        'n', 20, 22, 128, 56, 26);
      d.caption = 'Garbage in, garbage out: parsing, cleaning and PII handling happen before anything is embedded — this is where projects live or die.';
      return d;
    })(),

    /* M5 — GPU & server anatomy */
    m5: {
      nodes: [
        { id: 'gpu', x: 20, y: 70, w: 170, h: 88, icon: 'cpu', label: 'GPU', sub: 'A100 · H100 · B200' },
        { id: 'c1', x: 210, y: 16, w: 250, h: 44, label: 'Streaming cores', sub: '~10,000 parallel lanes' },
        { id: 'c2', x: 210, y: 70, w: 250, h: 44, label: 'Tensor cores', sub: 'FP16 / INT8 TFLOPS' },
        { id: 'c3', x: 210, y: 124, w: 250, h: 44, label: 'VRAM', sub: 'HBM · GB/s bandwidth' },
        { id: 'c4', x: 210, y: 178, w: 250, h: 44, label: 'NVLink', sub: 'GPU-to-GPU fabric' },
        { id: 'srv', x: 500, y: 60, w: 210, h: 110, icon: 'server', label: 'AI server', sub: '2× CPU · 8× GPU · NVMe · NIC' }
      ],
      edges: [{ a: 'gpu', b: 'srv' }],
      width: 730, height: 240,
      caption: 'The GPU card is one part — the balanced server (CPU, RAM, NVMe, NIC) and its fabric win the workload.'
    },

    /* M6 — storage tiers pyramid */
    m6: {
      nodes: [
        { id: 'b1', x: 315, y: 26, w: 170, h: 44, icon: 'zap', label: 'Local NVMe', sub: 'fast · small' },
        { id: 'b2', x: 250, y: 82, w: 300, h: 44, icon: 'database', label: 'Parallel FS', sub: 'Lustre · WEKA · GPFS' },
        { id: 'b3', x: 185, y: 138, w: 430, h: 44, icon: 'cloud', label: 'Object storage', sub: 'S3-compatible · scalable' },
        { id: 'b4', x: 120, y: 194, w: 560, h: 44, icon: 'archive', label: 'Cold archive', sub: 'cheap · durable' }
      ],
      edges: [{ a: 'b1', b: 'b2' }, { a: 'b2', b: 'b3' }, { a: 'b3', b: 'b4' }],
      width: 800, height: 258,
      caption: 'The hot/warm/cold ladder: fast and small on top, cheap and huge at the bottom. Checkpoints love throughput; vector DBs love low latency.'
    },

    /* M7 — spine-leaf AI fabric */
    m7: {
      nodes: [
        { id: 's1', x: 140, y: 18, w: 200, h: 40, label: 'Spine A' },
        { id: 's2', x: 420, y: 18, w: 200, h: 40, label: 'Spine B' },
        { id: 'l1', x: 60, y: 104, w: 180, h: 40, label: 'Leaf 1' },
        { id: 'l2', x: 300, y: 104, w: 180, h: 40, label: 'Leaf 2' },
        { id: 'l3', x: 540, y: 104, w: 180, h: 40, label: 'Leaf 3' },
        { id: 'sv1', x: 140, y: 186, w: 200, h: 56, icon: 'server', label: 'GPU server ×N', sub: '8 GPUs, 400/800G' },
        { id: 'sv2', x: 420, y: 186, w: 200, h: 56, icon: 'server', label: 'GPU server ×N', sub: '8 GPUs, 400/800G' }
      ],
      edges: [
        { a: 's1', b: 'l1' }, { a: 's1', b: 'l2' }, { a: 's1', b: 'l3' },
        { a: 's2', b: 'l1' }, { a: 's2', b: 'l2' }, { a: 's2', b: 'l3' },
        { a: 'l1', b: 'sv1' }, { a: 'l1', b: 'sv2' }, { a: 'l3', b: 'sv1' }, { a: 'l3', b: 'sv2' }
      ],
      width: 760, height: 262,
      caption: 'Non-blocking spine-leaf: every leaf reaches every spine, so no path is oversubscribed — the fabric a training cluster needs.'
    },

    /* M8 — Kubernetes stack */
    m8: {
      nodes: [
        { id: 'k1', x: 180, y: 16, w: 300, h: 56, icon: 'users', label: 'Users & API' },
        { id: 'k2', x: 180, y: 94, w: 300, h: 56, icon: 'door', label: 'Ingress / API gateway' },
        { id: 'k3', x: 180, y: 172, w: 300, h: 56, icon: 'box', label: 'Pods: vLLM · Triton', sub: 'KServe manages them' },
        { id: 'k4', x: 180, y: 250, w: 300, h: 56, icon: 'server', label: 'Node + device plugin', sub: 'GPUs as nvidia.com/gpu' },
        { id: 'k5', x: 180, y: 328, w: 300, h: 56, icon: 'zap', label: 'Hardware', sub: 'GPU · CPU · NVMe' }
      ],
      edges: [{ a: 'k1', b: 'k2' }, { a: 'k2', b: 'k3' }, { a: 'k3', b: 'k4' }, { a: 'k4', b: 'k5' }],
      width: 660, height: 404,
      caption: 'Kubernetes schedules GPUs as resources; MIG slices share one physical GPU across tenants.'
    },

    /* M9 — sizing math flow */
    m9: (function () {
      var d = flow(
        [{ icon: 'users', label: 'Users × concurrency' }, { icon: 'timer', label: 'Tokens/s demand' },
         { icon: 'divide', label: '÷ GPU throughput' }, { icon: 'shield', label: 'Headroom 1.5–2×' },
         { icon: 'hash', label: 'GPU count' }, { icon: 'check-circle', label: 'VRAM fit check' }],
        'n', 20, 22, 128, 56, 26);
      d.caption = 'Sizing = demand ÷ per-GPU throughput, then verify weights + KV cache fit in VRAM — and always state your assumptions out loud.';
      return d;
    })(),

    /* M10 — discovery call flow */
    m10: (function () {
      var d = flow(
        [{ icon: 'smile', label: 'Warm up' }, { icon: 'mic', label: 'Listen · SPIN' },
         { icon: 'clipboard', label: 'Requirements' }, { icon: 'layers', label: 'Architecture sketch' },
         { icon: 'calendar', label: 'Next steps' }],
        'n', 20, 22, 128, 56, 26);
      d.caption = 'Talk 30%, listen 70%. Every question should produce a number you can size against later.';
      return d;
    })(),

    /* M11 — RFP flow */
    m11: (function () {
      var d = flow(
        [{ icon: 'file', label: 'Read the RFP' }, { icon: 'scale', label: 'Evaluation criteria' },
         { icon: 'clipboard', label: 'Compliance matrix' }, { icon: 'pen', label: 'Write responses' },
         { icon: 'send', label: 'Review & submit' }, { icon: 'mic', label: 'Committee pitch' }],
        'n', 20, 22, 128, 56, 26);
      d.caption = 'Must = pass/fail gate. Should = scored points. Read the evaluation criteria twice before writing a word.';
      return d;
    })(),

    /* M12 — career launch flow */
    m12: (function () {
      var d = flow(
        [{ icon: 'book', label: 'Learn the skills' }, { icon: 'folder', label: 'Build a portfolio' },
         { icon: 'send', label: 'Apply' }, { icon: 'mic', label: 'Mock interview' },
         { icon: 'users', label: 'Real interviews' }, { icon: 'trophy', label: 'Win the offer' }],
        'n', 20, 22, 128, 56, 26);
      d.caption = 'The added-advantage skills (orchestration, multi-tenant GPU, vision AI) go into the portfolio too — show, don\u2019t tell.';
      return d;
    })()
  };
})();
