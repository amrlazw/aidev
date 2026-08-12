/* ============================================================
   AI Presales Academy — Mock interview question bank
   ============================================================ */
window.INTERVIEW_QUESTIONS = [

  /* ---------- icebreakers ---------- */
  { cat: 'Icebreaker',
    q: 'Tell me about yourself.',
    probe: 'They want a 90-second story, not a resume read. They are checking communication, energy and whether you sound like someone a customer would trust.',
    structure: [
      'Open with a one-line "who I am and what I do" (e.g. AI/tech background + why presales)',
      'Middle: one concrete proof point (project, course, demo, RAG build)',
      'Close: why this role — technical + customer-facing, and what you bring',
      'Practice it out loud until 90 seconds feels natural'
    ] },
  { cat: 'Icebreaker',
    q: 'Why presales, and why AI infrastructure specifically?',
    probe: 'They want genuine motivation — not "I couldn\u2019t decide between sales and engineering". They are screening for resilience and curiosity.',
    structure: [
      'A real "why" — e.g. you love both the technical depth and the human problem',
      'What you\u2019ve already done toward it (syllabus, projects, community)',
      'Why AI infra: the biggest technical wave + where sizing/architecture decisions actually matter',
      'End with what you want to learn in the first 6 months'
    ] },

  /* ---------- AI technical ---------- */
  { cat: 'AI Technical',
    q: 'Explain RAG to a non-technical executive in 2 minutes.',
    probe: 'Can you translate jargon into a story? Executives buy outcomes; this tests the exact skill you use in committee presentations.',
    structure: [
      'Pain first: LLMs hallucinate and know nothing about private data',
      'Analogy: "like giving the model a searchable filing cabinet — it reads the right files before answering"',
      'Two sentences on how: documents are indexed once; at query time we retrieve and ground the answer',
      'Business outcome: accurate answers on company data, with citations, no retraining'
    ] },
  { cat: 'AI Technical',
    q: 'When would you fine-tune vs use RAG?',
    probe: 'The classic decision question. They want to hear the framework, not a single answer.',
    structure: [
      'Decision ladder: prompt engineering → RAG (fresh/private knowledge) → fine-tuning (behavior/tone/format)',
      'Key line: "fine-tuning changes the model, RAG changes the input"',
      'Mention combining: fine-tune for behavior + RAG for knowledge',
      'Give one example where the wrong choice fails (fine-tuning for fresh data = expensive + stale)'
    ] },
  { cat: 'AI Technical',
    q: 'Walk me through the full lifecycle of deploying an LLM for a customer.',
    probe: 'Tests end-to-end thinking and whether you know the non-sexy parts (data, evaluation, monitoring).',
    structure: [
      'Data prep → evaluate base model (prompt engineering baseline)',
      'Decision: RAG / fine-tuning / both, with evaluation sets',
      'Serving: engine choice (vLLM / TensorRT-LLM), GPU sizing, VRAM math',
      'Deployment: on-prem/cloud/edge + security',
      'Monitoring: drift, hallucination rate, cost per query — then iterate'
    ] },
  { cat: 'AI Technical',
    q: 'A 7B FP16 model — how much VRAM, and what can you serve on one 24 GB GPU?',
    probe: 'They want the 14 GB answer and the reasoning, not a spec sheet recital.',
    structure: [
      '7B × 2 bytes = ~14 GB weights',
      'Add KV cache + activations + ~20–30% headroom',
      'Conclusion: fits one 24 GB GPU (L4/A10/4090-class) at moderate concurrency',
      'Extend: 70B FP16 ≈ 140 GB → 2× H100, or 1× H100 with INT8/FP8'
    ] },
  { cat: 'AI Technical',
    q: 'Why does inference feel slow, and what actually drives token speed?',
    probe: 'Tests whether you understand prefill vs decode and memory-bandwidth-bound serving — the real reason GPUs are "slow".',
    structure: [
      'Two phases: prefill (compute-bound, sets TTFT) and decode (bandwidth-bound, sets TPOT)',
      'Decode is memory-bandwidth-bound → GPU memory bandwidth, not FLOPS, is the decode bottleneck',
      'Batching + continuous batching (vLLM) raise throughput',
      'Quantization reduces bytes moved → faster decode'
    ] },
  { cat: 'AI Technical',
    q: 'What is the KV cache, and why do long contexts break inference?',
    probe: 'A newer, sharper question. Shows depth beyond "I used the API".',
    structure: [
      'KV cache = stored attention keys/values so decode doesn\u2019t recompute',
      'Size ≈ 2 × L × H_kv × head_dim × seq_len × batch × bytes',
      'Long context × big batch → gigabytes; that\u2019s why PagedAttention and GQA exist',
      'Implication for sizing: your "context window" is a memory budget too'
    ] },

  /* ---------- infrastructure ---------- */
  { cat: 'Infrastructure',
    q: 'A customer asks: "Why do I need a GPU for this?" — answer them.',
    probe: 'Can you make hardware reasoning customer-friendly? They are checking teaching ability.',
    structure: [
      'One line: transformers are massive parallel matrix math → GPUs are built for it',
      'CPUs: few powerful cores; GPUs: thousands of cores + tensor cores',
      'Concrete: the same workload that takes hours on CPU runs minutes on GPU',
      'Then pivot to size-right: not "biggest GPU" but "the one that pays for itself"'
    ] },
  { cat: 'Infrastructure',
    q: 'Why is networking suddenly a first-class topic in AI data centers?',
    probe: 'Tests awareness of east-west traffic — the thing that separates AI architects from generic IT.',
    structure: [
      'Distributed training = constant gradient sync (all-reduce) between GPUs',
      'This east-west traffic floods fabrics; NVLink handles it in-node, the network handles it across nodes',
      'RDMA/NCCL need lossless fabrics → InfiniBand or RoCE',
      'Design: 1:1 non-blocking (no oversubscription) for training fabrics'
    ] },
  { cat: 'Infrastructure',
    q: 'How do GPUs get shared across multiple teams? What breaks, and how do you fix it?',
    probe: 'The multi-tenant GPU question from the JD\u2019s "added advantage". They want isolation + orchestration + economics.',
    structure: [
      'Hardware: MIG (isolated slices), time-slicing (flexible), vGPU',
      'Orchestration: Kubernetes namespaces, ResourceQuotas, device plugins',
      'Isolation: per-tenant models, network policies, data separation',
      'Economics: utilization dashboards, chargeback/showback, fairness'
    ] },
  { cat: 'Infrastructure',
    q: 'Storage question: why do AI training clusters stall, and what storage do they actually need?',
    probe: 'Tests whether you know IOPS vs throughput vs latency, checkpoints, and parallel file systems.',
    structure: [
      'Stall = GPUs idle waiting for data (datasets, checkpoints)',
      'Metrics: throughput for checkpoints/datasets, IOPS+latency for vector DBs',
      'Parallel file systems (Lustre/WEKA/GPFS) for multi-node training',
      'Example: 70B FP16 checkpoint ≈ 140 GB; save time = size ÷ bandwidth'
    ] },
  { cat: 'Infrastructure',
    q: 'What would your Kubernetes deployment for an inference service look like?',
    probe: 'Can you describe a real deployment shape: engine, device plugin, scaling, monitoring?',
    structure: [
      'Deployment: vLLM/TensorRT-LLM pods with nvidia.com/gpu requests via device plugin',
      'KServe or Triton for serving layer; HPA on GPU utilization / queue depth',
      'Node pools sized to GPU SKUs; MIG for multi-tenant sharing',
      'Monitoring: token throughput, VRAM, p95 latency; autoscaling policies'
    ] },

  /* ---------- sizing & scenarios ---------- */
  { cat: 'Sizing & Scenario',
    q: 'Size an inference deployment: 1,000 employees, assistant with 2,000-token prompts and 500-token answers, 5-second target. Walk me through it.',
    probe: 'The money question. They want visible reasoning steps, assumptions stated, and a defensible conclusion.',
    structure: [
      'State assumptions first: e.g. 20% concurrent = 200 users, answers stream',
      'Tokens/s needed = 200 × 500 ÷ 5 s ≈ 20,000 tokens/s (if batched) — or size per-request first',
      'Map to GPUs using published throughput (~1.5–3.5k tok/s per H100 for 8B models)',
      'Add headroom (1.5–2×), check VRAM, then say what you\u2019d validate in a PoC'
    ] },
  { cat: 'Sizing & Scenario',
    q: 'The customer wants a 70B model on-prem. What do you recommend and what questions do you ask first?',
    probe: 'Combines sizing, deployment-model thinking, and discovery instincts.',
    structure: [
      'Ask first: users/concurrency, latency, data residency, skills, budget',
      'Compute: 70B FP16 ≈ 140 GB → 2× H100/H200, or FP8/INT4 on fewer',
      'Deployment: on-prem vs private cloud vs hybrid — criteria-based recommendation',
      'Don\u2019t forget: power/cooling, storage, networking, and whether 70B is even needed (RAG on a 8B may win)'
    ] },
  { cat: 'Sizing & Scenario',
    q: 'Why would you recommend a smaller model + RAG over a huge model for most enterprise use cases?',
    probe: 'Tests right-sizing philosophy — presales wins by saving the customer money, not maximizing specs.',
    structure: [
      'Most enterprise value = private/fresh data access, not model size',
      'Smaller model + RAG: lower cost, lower latency, easier compliance, easier to run on-prem',
      'Bigger models still win for complex reasoning/creative tasks — size by task',
      'Close: "I size to the workload, and I prove it in the PoC"'
    ] },
  { cat: 'Sizing & Scenario',
    q: 'Your customer says: "We\u2019ll just use ChatGPT for this." Respond.',
    probe: 'A real-world objection. They want you to agree where the customer is right and then differentiate technically.',
    structure: [
      'Validate: ChatGPT is great for many things and zero-IT-cost to start',
      'Differentiate on real gaps: private data, data residency/compliance, cost at scale, integration, customization, SLAs',
      'Frame: "start there if it works; here\u2019s the ceiling you\u2019ll hit and what we\u2019d build"',
      'Offer a small, measurable PoC — don\u2019t argue, demonstrate'
    ] },
  { cat: 'Sizing & Scenario',
    q: 'A bank needs an AI assistant but has strict data-residency rules. Design it.',
    probe: 'Tests deployment-model judgment + security + RAG architecture combined.',
    structure: [
      'Constraint first: data stays in-country → on-prem or private cloud (or in-region cloud)',
      'Architecture: RAG on their documents, local vector DB, no external APIs for data',
      'Security: PII handling at ingestion, access control, network segmentation, egress control',
      'Compliance story: audit, retention, model hosting within approved zones'
    ] },

  /* ---------- objections & commercial ---------- */
  { cat: 'Objections & Commercial',
    q: '"Your competitor is 40% cheaper." How do you respond?',
    probe: 'Never bad-mouth competitors. They want you to redirect to value, risk and total cost.',
    structure: [
      'Acknowledge the price gap directly — no defensiveness',
      'Compare TCO, not sticker price: power, cooling, people, support, time-to-value',
      'Ask what the cheaper quote includes: SLAs? services? migration? true capacity?',
      'Offer a PoC — "let\u2019s measure outcomes side by side"'
    ] },
  { cat: 'Objections & Commercial',
    q: '"We can build this in-house with open source." Respond.',
    probe: 'Open source is real competition. They want an honest, experienced answer — not fear.',
    structure: [
      'Agree: open source (vLLM, Kubernetes, FAISS…) is the right foundation',
      'Differentiate on the hard parts: integration, data engineering, security, operations, support, skills',
      '"Build vs buy" is really "DIY vs partner" — quantify time-to-production and run cost',
      'Offer a hybrid: open-source stack + your services/architecture'
    ] },
  { cat: 'Objections & Commercial',
    q: 'A customer asks about ROI. What do you say?',
    probe: 'Commercial fluency — connecting tech to money, which freshers often can\u2019t do.',
    structure: [
      'Ask what the current process costs: time, tickets, errors, headcount',
      'Estimate the after-state: faster answers, fewer escalations, better decisions',
      'Compute ROI = (value − TCO) over 3 years; show TCO lines: hardware, power, people',
      'Be honest about assumptions — "we validate these in the PoC"'
    ] },

  /* ---------- behavioral ---------- */
  { cat: 'Behavioral (STAR)',
    q: 'Tell me about a time a demo or presentation went wrong. What did you do?',
    probe: 'Presales is live, in front of customers. They want resilience, honesty and recovery skill.',
    structure: [
      'S: a demo failed (network, model, wrong data) — pick a real or realistic one',
      'T: keep the customer engaged and the credibility intact',
      'A: what you actually did — acknowledged it, pivoted, showed something that worked, followed up with a fix',
      'R: the outcome + the lesson you now build into every demo (rehearsal, fallbacks)'
    ] },
  { cat: 'Behavioral (STAR)',
    q: 'Tell me about a time you convinced a skeptic.',
    probe: 'They are testing persuasion without authority — the essence of presales.',
    structure: [
      'S: someone doubted your approach (a customer, teammate, teacher)',
      'T: change their mind based on evidence, not position',
      'A: listened first, found the real concern, showed data/demo, let them conclude',
      'R: the result — what changed and what you learned about persuasion'
    ] },
  { cat: 'Behavioral (STAR)',
    q: 'Tell me about a tight deadline where you had to learn something new fast.',
    probe: 'Presales is always "RFP due Friday". They want learning speed and prioritization.',
    structure: [
      'S: a real deadline with an unfamiliar topic',
      'T: deliver something credible on time',
      'A: how you learned (docs, communities, senior help), what you cut, what you kept',
      'R: delivered + the method you now reuse under pressure'
    ] },
  { cat: 'Behavioral (STAR)',
    q: 'Give an example of disagreeing with a teammate or manager.',
    probe: 'Are you coachable but principled? Can you disagree professionally?',
    structure: [
      'S: a genuine disagreement with stakes',
      'T: voice your view without damaging the relationship',
      'A: you argued from data, listened to their constraints, found common ground or escalated cleanly',
      'R: outcome + the communication lesson'
    ] },
  { cat: 'Behavioral (STAR)',
    q: 'How do you stay current in a field that changes weekly?',
    probe: 'AI moves fast; presales must stay credible. They want a system, not vibes.',
    structure: [
      'A daily system: 30–60 min of docs/newsletters/communities',
      'Hands-on: small projects (RAG demo, benchmark script) — building > reading',
      'Curated sources: official docs (NVIDIA, HF), presales community, release notes',
      'Share back: writing summaries or teaching others locks it in'
    ] }
];
