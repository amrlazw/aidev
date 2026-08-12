/* ============================================================
   AI Presales Academy — Syllabus content, part 1 (modules 0–5)
   ============================================================ */
window.MODULES_1 = [

/* ------------------------------ M0 ------------------------------ */
{
  id: 'm0', num: '00',
  title: 'The Role: Presales AI Engineer',
  tagline: 'Where sales, engineering and AI meet',
  week: 'Week 0 · ~2 hrs', icon: '🎯', color: '#38bdf8',
  objectives: [
    'Know exactly what a presales engineer does — and what they do NOT do',
    'Map every responsibility in the job description to real activities',
    'Understand your stakeholders, success metrics and career trajectory',
    'Speak the presales vocabulary: PoC, RFP, TCO, HLD/LLD, BOM'
  ],
  lessons: [
    {
      title: 'What is presales?',
      body: `<p>Presales (aka sales engineering / solution consulting) is the <b>technical work that happens before the deal closes</b>. You are the trusted technical expert on sales calls: you translate a customer's business problem into a credible architecture, prove it can work, and remove the technical risk from buying.</p>
      <p>Sales owns the relationship and the commercial process. <b>You own the credibility.</b> The customer's engineers judge the proposal on your word — so your reputation is the product.</p>`
    },
    {
      title: 'The presales lifecycle',
      body: `<p>A typical opportunity flows through 7 stages — know them cold, because every JD activity fits in one:</p>
      <ul>
        <li><b>1. Discovery</b> — listen: pain, use case, constraints, budget, timeline</li>
        <li><b>2. Requirements</b> — turn what you heard into measurable technical requirements</li>
        <li><b>3. Architecture</b> — design the solution (HLD → LLD)</li>
        <li><b>4. Sizing</b> — GPU / storage / network / BOM numbers</li>
        <li><b>5. Demo or PoC</b> — prove it works with the customer's data</li>
        <li><b>6. Proposal / RFP response</b> — written solution + compliance</li>
        <li><b>7. Presentation &amp; handoff</b> — present to the committee, then hand to delivery</li>
      </ul>`
    },
    {
      title: 'Your stakeholders',
      body: `<p>Everyone pulls you in different directions. Learn to juggle:</p>
      <ul>
        <li><b>Customers</b> — technical staff <i>and</i> business buyers; each needs a different story</li>
        <li><b>Sales</b> — they want speed, win themes and competitive ammo</li>
        <li><b>Partners / channels</b> — you enable them so they can sell your stack</li>
        <li><b>Vendors / principals</b> — roadmap alignment, certification, validation</li>
        <li><b>Delivery teams</b> — whatever you promise in the deal, they must be able to build</li>
      </ul>
      <p>Rule of thumb: <b>under-promise to the customer, over-deliver with the team.</b></p>`
    },
    {
      title: 'The job description, decoded',
      body: `<p>Every line of the JD maps to this syllabus:</p>
      <ul>
        <li><b>Presales &amp; Opportunity Support</b> → discovery + sizing (Modules 9–10)</li>
        <li><b>Solution Architecture &amp; Design</b> → HLD/LLD, deployment models, BOM (Modules 3, 5–9)</li>
        <li><b>Partner &amp; Channel Enablement</b> → training, demo kits (Module 10)</li>
        <li><b>Tender / RFP Engagement</b> → compliance responses, committee presentations (Module 11)</li>
        <li><b>Vendor &amp; Ecosystem</b> → roadmaps, validation, certification (Modules 5, 12)</li>
        <li><b>Internal Development</b> → reference architectures, knowledge sharing (Module 12)</li>
      </ul>`
    },
    {
      title: 'The skill stack',
      body: `<p>You need three layers — miss one and you lose credibility:</p>
      <ul>
        <li><b>AI &amp; Data knowledge</b> — LLMs, VLMs, RAG, fine-tuning vs inference, model lifecycle, vector search (Modules 1–4)</li>
        <li><b>Infrastructure</b> — GPUs, storage, networking, containers, Kubernetes (Modules 5–8)</li>
        <li><b>Presales craft</b> — discovery, demos, workshops, RFPs, presentations (Modules 10–11)</li>
      </ul>
      <p>The JD's "added advantage" items — Python, vision/robotics, orchestration tools, multi-tenant GPU — are your differentiators (Module 12).</p>`
    },
    {
      title: 'How you are measured',
      body: `<p>Understand the metrics before you start:</p>
      <ul>
        <li>Win rate &amp; pipeline influenced (did your technical work help close?)</li>
        <li>PoC success rate (promised → delivered → signed)</li>
        <li>Partner readiness (can partners sell without you?)</li>
        <li>Reusable assets produced (demo kits, reference architectures, benchmarks)</li>
        <li>Time-to-response on RFPs and escalations</li>
      </ul>
      <p>Fresh grads succeed here not by knowing everything, but by being <b>fast, curious and honest</b> — "I don't know, let me find out" is a professional sentence in presales.</p>`
    }
  ],
  terms: [
    { term: 'Presales', def: 'Technical work done before a deal closes: discovery, architecture, sizing, demo, RFP.' },
    { term: 'PoC', def: 'Proof of Concept — a small, timeboxed build that proves the solution works on the customer\u2019s data.' },
    { term: 'RFP / RFI', def: 'Request for Proposal / Information — formal documents customers use to buy technology.' },
    { term: 'HLD / LLD', def: 'High-Level Design (what &amp; why) vs Low-Level Design (exact configs, ports, SKUs).' },
    { term: 'TCO / ROI', def: 'Total Cost of Ownership vs Return on Investment — the two numbers every buyer cares about.' },
    { term: 'BOM', def: 'Bill of Materials — the priced list of hardware, software and services in your proposal.' }
  ],
  quiz: [
    { q: 'What is the primary value a presales AI engineer adds to a deal?',
      options: ['Writing all the code for the customer', 'Removing technical risk and building credibility so the customer can buy with confidence', 'Managing the contract and pricing negotiations alone', 'Running the customer\u2019s production AI systems'],
      correct: 1, explain: 'Presales removes technical risk. Sales owns relationship/commercial; delivery owns production.' },
    { q: 'In which lifecycle stage do you turn customer pain into measurable requirements?',
      options: ['Discovery', 'Sizing', 'Handoff', 'Proposal'],
      correct: 0, explain: 'Discovery is listening; requirements are the measurable output of what you heard.' },
    { q: 'The job description lists "reusable demo kits and best practices" under which responsibility?',
      options: ['Tender / RFP Engagement', 'Partner &amp; Channel Enablement', 'Vendor &amp; Ecosystem Collaboration', 'Internal Development'],
      correct: 1, explain: 'Demo kits + best practices + positioning guidance = partner &amp; channel enablement.' },
    { q: 'You promise a customer a feature the delivery team cannot build. What went wrong?',
      options: ['Nothing — the sales team will fix it', 'You violated the under-promise / over-deliver rule', 'The customer asked for too much', 'Delivery should have been consulted at handoff only'],
      correct: 1, explain: 'Never promise what you cannot deliver. The presales engineer owns solution credibility end to end.' }
  ],
  activity: {
    title: 'Write your "Day in the life"',
    goal: 'A one-page document proving you understand the role before you interview for it.',
    steps: [
      'Write a realistic day (08:30 – 18:00) for a presales AI engineer covering at least 5 of the 6 JD responsibility areas',
      'Include one sizing conversation, one demo, one RFP task and one partner workshop',
      'List 3 questions you would ask in your first discovery call with a manufacturing customer',
      'Re-read the JD and annotate each bullet with the module in this syllabus that trains it'
    ]
  },
  resources: [
    { label: 'The Enterprise Presales Playbook', url: 'https://gauravs19.github.io/presales-playbook/', note: 'Free open-source presales frameworks &amp; discovery structures' },
    { label: 'The Presales Collective', url: 'https://www.presalescollective.com/', note: 'Largest community for presales / solution engineers' },
    { label: 'MEDDIC explained', url: 'https://www.meddicc.com/', note: 'Sales qualification framework you will hear daily' }
  ]
},

/* ------------------------------ M1 ------------------------------ */
{
  id: 'm1', num: '01',
  title: 'AI &amp; LLM Fundamentals',
  tagline: 'Talk about models like you have built them',
  week: 'Week 1 · ~6 hrs', icon: '🧠', color: '#a78bfa',
  objectives: [
    'Explain how an LLM works — simply enough for a non-technical customer',
    'Define tokens, embeddings, context windows, parameters and quantization',
    'Know what a VLM is and where multimodal matters',
    'Speak inference vocabulary: prefill, decode, latency, throughput, hallucination'
  ],
  lessons: [
    {
      title: 'What an LLM actually does',
      body: `<p>An LLM (Large Language Model) is a <b>next-token predictor</b>: given a sequence of tokens, it predicts the most probable next one, then repeats. All the "intelligence" emerges from this loop.</p>
      <p>Architecture: the <b>transformer</b> — layers of <b>self-attention</b> (every token looks at every other token to build context) plus feed-forward networks. Trained by <b>self-supervised learning</b> on huge text corpora.</p>
      <p>Analogy for customers: <i>"an extremely well-read autocomplete engine that learned the patterns of human language."</i></p>`
    },
    {
      title: 'Tokens &amp; the context window',
      body: `<p><b>Tokens</b> are how text is chopped up — roughly 3–4 characters or ~0.7 words per token. The model never sees characters; it sees token IDs.</p>
      <p><b>Context window</b> = the maximum tokens the model can attend to at once (e.g. 8K, 128K, 1M). Longer context = more capability but more memory and cost.</p>
      <p>Presales insight: customers asking "which model?" usually mean "which context window and which accuracy for my data?" — always clarify.</p>`
    },
    {
      title: 'Embeddings — numbers that mean things',
      body: `<p>An <b>embedding</b> is a list of numbers (a vector, e.g. 768–3072 dimensions) that captures a piece of text's meaning. <b>Similar meaning → similar direction</b> in vector space.</p>
      <p>Embeddings are the foundation of semantic search and RAG (Module 2): text is turned into vectors, stored in a vector database, and queries are matched by <i>meaning</i>, not keywords.</p>
      <p>Example you can use: "dog", "puppy", "canine" sit close together; "car" is far away.</p>`
    },
    {
      title: 'Parameters, sizes &amp; quantization',
      body: `<p>"70B" = 70 <b>billion parameters</b> — the weights learned during training. Roughly: more parameters → more capability → more memory.</p>
      <p><b>Quantization</b> shrinks precision to fit more model on fewer GPUs, trading a little quality for size and speed:</p>
      <ul>
        <li>FP32 = 4 bytes/param · FP16/BF16 = 2 · INT8 = 1 · INT4 = 0.5</li>
        <li>7B model: ~28 GB FP32 → ~14 GB FP16 → ~7 GB INT8 → ~4 GB INT4</li>
        <li>70B model: ~140 GB FP16 → ~70 GB INT8 → ~40 GB INT4</li>
      </ul>`
    },
    {
      title: 'VLMs &amp; multimodal models',
      body: `<p>A <b>VLM (vision-language model)</b> understands images + text together (e.g. CLIP, LLaVA, GPT-4o, Qwen-VL). Inputs are images, documents, screenshots or video frames, not just text.</p>
      <p>Why it matters for this role (JD: "Understanding of LLM &amp; VLM concepts"):</p>
      <ul>
        <li><b>Document AI</b> — reading scanned PDFs, forms, tables (huge enterprise demand)</li>
        <li><b>Vision / robotics</b> — the JD's "added advantage" (Module 12)</li>
        <li><b>Multimodal RAG</b> — searching images and text together</li>
      </ul>`
    },
    {
      title: 'Inference vocabulary — speak it fluently',
      body: `<p>When a model <b>generates</b> text, two phases matter:</p>
      <ul>
        <li><b>Prefill</b> — process the input prompt in parallel. Fast, compute-bound. Sets the <b>TTFT</b> (time to first token).</li>
        <li><b>Decode</b> — generate output tokens one at a time. Slow, memory-bandwidth-bound. Sets <b>TPOT</b> (time per output token).</li>
      </ul>
      <p>Other must-knows: <b>latency</b> (how fast one request feels) vs <b>throughput</b> (how many tokens/sec the GPU produces across all requests); <b>batching</b> (serving many requests together → throughput up); <b>temperature / top-p</b> (randomness controls); <b>hallucination</b> (confident wrong answers — the customer's #1 fear, and RAG's reason to exist).</p>`
    }
  ],
  terms: [
    { term: 'Token', def: 'Text fragment the model processes (~0.7 words). Token IDs are the model\u2019s input.' },
    { term: 'Embedding', def: 'A vector of numbers capturing meaning; similar text → similar vectors.' },
    { term: 'Context window', def: 'Max tokens a model can attend to in one prompt (8K → 1M+).' },
    { term: 'Quantization', def: 'Lowering weight precision (FP16→INT8→INT4) to save memory at some quality cost.' },
    { term: 'Hallucination', def: 'Confident, wrong output. The main reason customers adopt RAG.' },
    { term: 'TTFT / TPOT', def: 'Time To First Token (responsiveness) / Time Per Output Token (streaming speed).' }
  ],
  quiz: [
    { q: 'At its core, an LLM is best described as:',
      options: ['A database of facts', 'A next-token predictor trained on huge text corpora', 'A search engine with a chat interface', 'A rule-based grammar engine'],
      correct: 1, explain: 'LLMs predict the next token; everything else is emergent behavior.' },
    { q: 'Why do embeddings matter for search?',
      options: ['They compress text losslessly', 'They place similar meanings close together in vector space', 'They count word frequencies', 'They encrypt documents'],
      correct: 1, explain: 'Semantic similarity = vector proximity — the basis of vector search and RAG.' },
    { q: 'Quantizing a 70B model from FP16 to INT8 changes its weight memory from:',
      options: ['140 GB to ~70 GB', '70 GB to 35 GB', '140 GB to 14 GB', '280 GB to 140 GB'],
      correct: 0, explain: 'INT8 halves FP16 (2 → 1 byte/param): 70 × 2 = 140 → 70 GB.' },
    { q: 'During which phase is the model memory-bandwidth-bound and produces tokens one at a time?',
      options: ['Prefill', 'Decode', 'Embedding', 'Tokenization'],
      correct: 1, explain: 'Decode is sequential and bandwidth-bound; prefill is parallel and compute-bound.' }
  ],
  activity: {
    title: 'Explain it to a stranger',
    goal: 'Be able to explain an LLM in 3 sentences to a non-technical person — the #1 presales skill.',
    steps: [
      'Open a free model (ChatGPT, Claude, Gemini, or a local model) and count how many words ~100 tokens produce using an online tokenizer',
      'Write a 3-sentence explanation of "how an LLM works" — no jargon allowed',
      'Define the words: token, context window, embedding, hallucination — from memory',
      'Search "best LLM for enterprise RAG 2025" and note 3 model families and their context windows'
    ]
  },
  resources: [
    { label: 'Hugging Face LLM course (free)', url: 'https://huggingface.co/learn/llm-course/en/chapter1/1', note: 'Hands-on transformers, tokenizers, fine-tuning' },
    { label: '3Blue1Brown — neural networks', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', note: 'Best visual intuition for how networks learn' },
    { label: 'RunPod GPU memory sizing guide', url: 'https://www.runpod.io/articles/guides/gpu-memory-sizing-guide-for-llm-inference', note: 'Practical VRAM math for real models' }
  ]
},

/* ------------------------------ M2 ------------------------------ */
{
  id: 'm2', num: '02',
  title: 'RAG Architecture',
  tagline: 'Ground models in real, private data',
  week: 'Week 2 · ~8 hrs', icon: '🔍', color: '#34d399',
  objectives: [
    'Explain why RAG exists and when to recommend it over fine-tuning',
    'Draw the ingestion pipeline and the query pipeline from memory',
    'Know chunking, embedding, vector DBs, retrieval and reranking',
    'Diagnose the common ways RAG systems fail'
  ],
  lessons: [
    {
      title: 'Why RAG? (Retrieval-Augmented Generation)',
      body: `<p>LLMs hallucinate and know nothing about your customer's private data. <b>RAG fixes both</b>: at query time, retrieve the relevant documents from a searchable index and stuff them into the prompt as grounding context.</p>
      <p>Why it beat fine-tuning as the default answer: <b>no retraining, fresh data, citations, and easy rollback.</b> It is the single most common AI architecture in enterprise deals.</p>`
    },
    {
      title: 'The ingestion pipeline',
      body: `<p>Offline path — prepare data once (and on a schedule):</p>
      <ul>
        <li><b>Source</b> — files, SharePoint, databases, wikis, email, scanned PDFs</li>
        <li><b>Parse &amp; clean</b> — OCR scanned docs, extract tables, strip boilerplate</li>
        <li><b>Chunk</b> — split into retrievable pieces with metadata (source, date, page)</li>
        <li><b>Embed</b> — convert each chunk to a vector</li>
        <li><b>Index</b> — store vectors + metadata in a vector database</li>
      </ul>
      <p>Customers always underestimate how messy their data is. Discovery question: <i>"Show me where the data lives and who owns it."</i></p>`
    },
    {
      title: 'Chunking — get this wrong and RAG fails',
      body: `<p>Chunk size is the classic trade-off:</p>
      <ul>
        <li><b>Too big</b> → diluted signal; retrieval pulls in noise</li>
        <li><b>Too small</b> → the answer is split across chunks; context lost</li>
        <li>Common strategies: fixed-size with overlap, paragraph-based, semantic (break on meaning), structure-aware (markdown/PDF headings)</li>
      </ul>
      <p>Rule of thumb: 200–800 tokens per chunk with ~10–15% overlap is a sane starting point — then <b>evaluate</b> and tune.</p>`
    },
    {
      title: 'Vector databases &amp; approximate search',
      body: `<p>At scale you cannot scan every vector (exact kNN). You use <b>ANN — approximate nearest neighbor</b> indexes:</p>
      <ul>
        <li><b>HNSW</b> — graph-based; great recall/latency balance; the default for many products</li>
        <li><b>IVF</b> — clusters; faster index build, lower memory</li>
        <li>Popular options: <b>FAISS</b> (library), <b>Milvus / Qdrant / Weaviate</b> (services), <b>pgvector</b> (inside Postgres — easy start)</li>
        <li>Always store <b>metadata</b> (tenant, date, type) for filtering — most real queries are filtered searches</li>
      </ul>`
    },
    {
      title: 'The query pipeline — retrieval + generation',
      body: `<p>Online path for every user question:</p>
      <ul>
        <li>1. Embed the query</li>
        <li>2. Vector search (top-k, e.g. 10–20 chunks)</li>
        <li>3. <b>Hybrid search</b> — merge with keyword (BM25) results; catches exact names, codes, IDs that vectors miss</li>
        <li>4. <b>Rerank</b> — a small cross-encoder scores the candidates for precision; keeps only the best 3–5</li>
        <li>5. Build the prompt: system + retrieved chunks + question, with citations</li>
        <li>6. LLM answers <i>grounded</i> in the context — and can say "not in the documents"</li>
      </ul>`
    },
    {
      title: 'Where RAG fails (and what you say about it)',
      body: `<p>Interview and customer gold — know the failure modes:</p>
      <ul>
        <li><b>Retrieval misses</b> → answer not in the top-k. Fix: hybrid search, rerankers, better chunking, query rewriting</li>
        <li><b>Stale data</b> → index out of date. Fix: incremental ingestion, CDC, freshness SLA</li>
        <li><b>Prompt injection</b> → malicious text inside documents hijacks the model. Fix: filtering, instruction hardening</li>
        <li><b>Citation accuracy</b> → model cites a chunk that doesn't support the claim. Fix: groundedness evaluation</li>
        <li><b>No evaluation</b> → teams ship RAG without measuring it. Fix: eval set + retrieval metrics (recall@k, MRR)</li>
      </ul>`
    },
    {
      title: 'RAG maturity — naive → advanced → agentic',
      body: `<p>Sound senior by describing the evolution:</p>
      <ul>
        <li><b>Naive RAG</b> — embed → retrieve → stuff prompt</li>
        <li><b>Advanced RAG</b> — query rewriting, hybrid search, reranking, metadata filtering, better chunking</li>
        <li><b>Agentic RAG</b> — the LLM decides: multiple tools, multi-hop lookups, follow-up questions, memory (Modules 3 &amp; 12)</li>
      </ul>
      <p>Most enterprises need "advanced RAG done well", not agentic hype. Say that in the room — it builds instant credibility.</p>`
    }
  ],
  terms: [
    { term: 'Chunking', def: 'Splitting documents into retrievable pieces with overlap + metadata.' },
    { term: 'Vector DB', def: 'Store + ANN-search embeddings: FAISS, Milvus, Qdrant, Weaviate, pgvector.' },
    { term: 'ANN / HNSW', def: 'Approximate nearest neighbor; HNSW = the popular graph index.' },
    { term: 'Reranker', def: 'Cross-encoder that re-scores top-k chunks for precision.' },
    { term: 'Hybrid search', def: 'Vector + BM25 keyword + metadata filters combined.' },
    { term: 'Grounding', def: 'Answering only from retrieved evidence — with citations.' }
  ],
  quiz: [
    { q: 'The main reason RAG beats fine-tuning for most enterprise use cases:',
      options: ['It is cheaper to train', 'It injects fresh and private data at query time without retraining', 'It makes models larger', 'It removes the need for GPUs'],
      correct: 1, explain: 'No retraining + fresh data + citations + rollback = the default choice.' },
    { q: 'Where does chunking happen in the RAG lifecycle?',
      options: ['During query embedding', 'During ingestion, before embedding', 'Inside the LLM', 'At reranking time'],
      correct: 1, explain: 'Chunking is part of the offline ingestion pipeline.' },
    { q: 'A user searches a product code "XK-2049" and vector search fails. Best fix:',
      options: ['Buy a bigger model', 'Add hybrid search with BM25 to catch exact tokens', 'Reduce chunk size to 50 tokens', 'Disable metadata filtering'],
      correct: 1, explain: 'Exact identifiers are a classic hybrid-search use case.' },
    { q: 'Your customer\u2019s RAG bot confidently cites an old price list. What likely failed?',
      options: ['The embedding model was too small', 'Data freshness — the index is stale; no freshness SLA', 'The GPU was too slow', 'The temperature was set too high'],
      correct: 1, explain: 'Stale index = wrong grounding. Freshness pipelines are part of the architecture.' }
  ],
  activity: {
    title: 'Draw RAG, end to end',
    goal: 'Draw both pipelines from memory on paper — you will do this live on whiteboards in interviews.',
    steps: [
      'Draw the ingestion pipeline: sources → parse/OCR → clean → chunk → embed → vector DB (label each box)',
      'Draw the query pipeline: query → embed → hybrid search → rerank → prompt → grounded answer',
      'Pick a real scenario (legal contract Q&amp;A) and write 3 failure modes + 1 fix each',
      'Skim Pinecone\u2019s learning center and note 2 advanced RAG techniques you can name-drop'
    ]
  },
  resources: [
    { label: 'Pinecone Learning Center', url: 'https://www.pinecone.io/learn', note: 'Free courses on vector search &amp; RAG patterns' },
    { label: 'Weaviate Academy', url: 'https://weaviate.io/learn', note: 'Hybrid search, chunking, multi-tenancy RAG' },
    { label: 'Hugging Face Agents course', url: 'https://huggingface.co/learn/agents-course/en/unit0/introduction', note: 'When you are ready for agentic RAG' }
  ]
},

/* ------------------------------ M3 ------------------------------ */
{
  id: 'm3', num: '03',
  title: 'Model Lifecycle: Fine-Tuning vs Inference',
  tagline: 'The full journey from data to deployed model',
  week: 'Week 3 · ~8 hrs', icon: '🔄', color: '#f472b6',
  objectives: [
    'Explain the end-to-end model lifecycle',
    'Decide between prompt engineering, RAG and fine-tuning for any scenario',
    'Understand LoRA / QLoRA and when fine-tuning is worth it',
    'Do the VRAM math to serve a model — and talk evals credibly'
  ],
  lessons: [
    {
      title: 'The model lifecycle',
      body: `<p>The lifecycle every customer conversation orbits:</p>
      <ul>
        <li><b>Data prep</b> → clean, label, dedupe (often 60% of project time)</li>
        <li><b>Pretraining</b> — huge cost; almost nobody does this (rarely in scope for presales)</li>
        <li><b>Fine-tuning</b> — adapt a base model to a domain or behavior</li>
        <li><b>Evaluation</b> — measure before you deploy (Module 4 also covers RAG evals)</li>
        <li><b>Deployment &amp; serving</b> — put it on GPUs with an inference engine</li>
        <li><b>Monitoring &amp; feedback</b> — drift, quality, cost — then iterate</li>
      </ul>`
    },
    {
      title: 'The decision framework',
      body: `<p>Presales gold — a simple ladder you can draw on a whiteboard:</p>
      <ul>
        <li><b>Prompt engineering</b> — cheapest; try first (90% of simple cases)</li>
        <li><b>RAG</b> — when knowledge is fresh, private, or changing (Module 2)</li>
        <li><b>Fine-tuning</b> — when you need consistent <i>behavior</i>: tone, format, style, domain structure, reliability</li>
        <li><b>Combined</b> — fine-tune for behavior + RAG for knowledge (most serious deployments)</li>
      </ul>
      <p>Say it with confidence: <i>"Fine-tuning changes the model; RAG changes the input."</i></p>`
    },
    {
      title: 'Fine-tuning, demystified',
      body: `<p><b>SFT (supervised fine-tuning)</b> = train on examples of the exact input/output behavior you want. Needs curated data — often the real bottleneck.</p>
      <p><b>Parameter-efficient fine-tuning (PEFT)</b> is how the industry actually does it:</p>
      <ul>
        <li><b>LoRA</b> — freeze the base model, train small "adapter" matrices; a few % of parameters → tiny GPU footprint</li>
        <li><b>QLoRA</b> — LoRA on a quantized base model; fine-tune a 70B on a single 48 GB GPU</li>
      </ul>
      <p>Interview line: <i>"Fine-tuning a 70B with QLoRA fits on one workstation GPU — full fine-tuning would need a cluster."</i></p>`
    },
    {
      title: 'Evaluation — the credibility gap',
      body: `<p>Anyone can demo a chatbot. <b>Presales engineers win by talking about evaluation.</b></p>
      <ul>
        <li>Build an <b>eval set</b> of realistic, labeled questions before the project starts</li>
        <li>Metrics: task accuracy, hallucination rate, retrieval recall@k, latency, cost per query</li>
        <li>LLM-as-judge: a strong model scores outputs when human labels are too costly</li>
        <li>A/B test: baseline vs candidate on the same eval set</li>
      </ul>
      <p>In demos, show your eval numbers — it is the single most "enterprise-ready" thing you can do.</p>`
    },
    {
      title: 'Inference &amp; serving engines',
      body: `<p>Serving is where infrastructure meets models — the JD's "AI orchestration tools":</p>
      <ul>
        <li><b>vLLM</b> — open-source; PagedAttention + continuous batching; the fastest way to high throughput on HF models</li>
        <li><b>TensorRT-LLM</b> — NVIDIA's compiled engine; 20–40% more throughput &amp; lower p99 latency than interpreters; needs an offline compile step (15–30 min)</li>
        <li><b>TGI</b> — Hugging Face's production server; tensor parallelism, streaming, guardrails</li>
        <li><b>Triton</b> — the orchestrator: wraps any backend behind one API; multi-model, metrics</li>
      </ul>
      <p>Architecture pattern you can name: <i>"TensorRT-LLM or vLLM as the engine, wrapped by Triton for fleet management."</i></p>`
    },
    {
      title: 'GPU math for serving',
      body: `<p>Memory = <b>weights + KV cache + activations + headroom (~20–30%)</b>. Numbers you can quote:</p>
      <ul>
        <li>7B FP16 ≈ 14 GB weights → one 24 GB GPU (A10/L4/4090) serves it with room for KV cache</li>
        <li>70B FP16 ≈ 140 GB → 2× H100/H200, or 1× H100 with FP8/INT8</li>
        <li>Throughput (published, batch 16–32): 7–8B on one H100/A100 ≈ 1,500–3,500+ tokens/s aggregate; 70B FP8 on H100 ≈ 1,800–6,000 tokens/s</li>
        <li>Latency vs throughput: bigger batches → more throughput, slightly worse per-request latency. Customers want both; you explain the trade-off.</li>
      </ul>`
    }
  ],
  terms: [
    { term: 'SFT', def: 'Supervised fine-tuning — training on labeled input/output examples.' },
    { term: 'LoRA / QLoRA', def: 'Parameter-efficient fine-tuning: tiny adapters on frozen/quantized base models.' },
    { term: 'Eval set', def: 'Labeled questions used to measure quality before and after changes.' },
    { term: 'vLLM', def: 'High-throughput open-source LLM server (PagedAttention, continuous batching).' },
    { term: 'KV cache', def: 'Cached attention keys/values; the memory that grows with context × batch.' },
    { term: 'Continuous batching', def: 'Serving engines adding/removing requests per step — huge throughput win.' }
  ],
  quiz: [
    { q: 'A customer needs their assistant to always reply in a strict legal format. Best primary strategy:',
      options: ['Prompt engineering only', 'Fine-tuning for behavior, RAG for knowledge', 'A bigger context window', 'Deploying on more GPUs'],
      correct: 1, explain: 'Consistent behavior = fine-tuning; fresh knowledge = RAG. Combined is the serious answer.' },
    { q: 'Why is LoRA attractive for most customers?',
      options: ['It doubles model accuracy', 'It trains only a small adapter, so GPU cost is low', 'It removes the need for GPUs entirely', 'It makes the model open-source'],
      correct: 1, explain: 'A few percent of parameters trainable → fits on far fewer GPUs than full fine-tuning.' },
    { q: 'Weights for a 70B FP16 model need approximately:',
      options: ['14 GB', '70 GB', '140 GB', '280 GB'],
      correct: 2, explain: '70B × 2 bytes = 140 GB → 2× H100/H200 or 1× H100 with FP8/INT8.' },
    { q: 'The job description\u2019s "AI orchestration tools" most directly refers to:',
      options: ['Vector databases', 'Serving engines like vLLM / TensorRT-LLM / Triton', 'CRM systems', 'Monitoring dashboards'],
      correct: 1, explain: 'Inference servers and orchestration layers are the "orchestration tools" of the AI stack.' }
  ],
  activity: {
    title: 'The decision game',
    goal: 'Make instant, justified architecture choices — exactly what you do in customer rooms.',
    steps: [
      'Scenario A: legal document Q&amp;A across 2M contracts → decide RAG vs fine-tune vs both, justify in 3 sentences',
      'Scenario B: support tickets must always match company tone → decide and justify',
      'Scenario C: internal code generator that must emit the company\u2019s API style → decide and justify',
      'Calculate VRAM for serving a 70B model at FP16 and at INT8; state how many H100s each needs'
    ]
  },
  resources: [
    { label: 'vLLM docs', url: 'https://docs.vllm.ai/', note: 'Install, engine config, benchmarking' },
    { label: 'Northflank: vLLM vs TensorRT-LLM', url: 'https://northflank.com/blog/vllm-vs-tensorrt-llm-and-how-to-run-them', note: 'Honest engine comparison for interviews' },
    { label: 'HF PEFT (LoRA) docs', url: 'https://huggingface.co/docs/peft', note: 'Hands-on parameter-efficient fine-tuning' }
  ]
},

/* ------------------------------ M4 ------------------------------ */
{
  id: 'm4', num: '04',
  title: 'Data Ingestion &amp; Vector Search',
  tagline: 'Enterprise data is messy — architect for that',
  week: 'Week 4 · ~6 hrs', icon: '🗂', color: '#fb923c',
  objectives: [
    'Design an ingestion pipeline for messy enterprise data',
    'Know parsing, OCR, cleaning and PII handling',
    'Understand ANN search mechanics and index trade-offs',
    'Explain hybrid search, metadata filtering and freshness'
  ],
  lessons: [
    {
      title: 'Data reality in enterprises',
      body: `<p>Enterprise data is <b>PDFs, scanned docs, SharePoint, wikis, databases, email, Excel</b> — in every format, quality and language you can imagine. The first discovery question is always: <i>"Where does the data live, and who owns it?"</i></p>
      <p>Most failed AI projects die here, not at the model. Architecture time belongs to data engineering.</p>`
    },
    {
      title: 'Parsing &amp; extraction',
      body: `<ul>
        <li><b>OCR</b> — scanned documents become text (Tesseract, Azure/Google OCR, AWS Textract)</li>
        <li><b>Layout-aware parsing</b> — keep headings, tables and structure (unstructured.io, docling)</li>
        <li><b>Tables</b> — extract to structured rows before chunking (naive PDF text kills tables)</li>
        <li><b>Multi-format</b> — DOCX, PPTX, HTML, markdown all need different extractors</li>
      </ul>
      <p>Mention <code>unstructured.io</code> or <code>docling</code> in an interview and you instantly sound real.</p>`
    },
    {
      title: 'Cleaning, governance &amp; PII',
      body: `<p><b>Cleaning:</b> dedupe, normalize dates/units, strip boilerplate and headers/footers, drop empty chunks.</p>
      <p><b>Governance (presales must raise this — no one else will):</b></p>
      <ul>
        <li>PII / sensitive data — redact or restrict before embedding (embeddings are hard to "un-see")</li>
        <li>Access control — metadata-level permissions so users only retrieve what they may see</li>
        <li>Compliance — GDPR/DPDP/CCPA, data residency, audit trails; ask about it in discovery</li>
        <li>Retention — what happens to the index when data is deleted</li>
      </ul>`
    },
    {
      title: 'Vector search under the hood',
      body: `<p>Exact kNN scans everything — too slow at millions of vectors. <b>ANN (approximate nearest neighbor)</b> trades a little recall for speed:</p>
      <ul>
        <li><b>HNSW</b> — navigable small-world graph; best recall/latency; more memory</li>
        <li><b>IVF</b> — inverted file clusters; less memory, slightly lower recall</li>
        <li>Vector dimensions: 384 / 768 / 1536 / 3072 — bigger = more expressive, more memory</li>
        <li>Product quantization (PQ) compresses vectors at some recall cost</li>
      </ul>
      <p>Customers ask "how fast?" — answer: p95 latency at N million vectors with recall@10 ≥ 0.9 is the metric, not "fast".</p>`
    },
    {
      title: 'Hybrid search &amp; metadata filtering',
      body: `<ul>
        <li><b>BM25</b> — classic keyword ranking; exact-match superpower (codes, names, IDs)</li>
        <li><b>Hybrid</b> — merge dense vector scores + BM25 scores (weighted, e.g. 60/40 or RRF)</li>
        <li><b>Metadata filters</b> — tenant, region, doc type, date range; most queries are filtered</li>
        <li>Combination is what production RAG uses — pure vector search is a demo-only story</li>
      </ul>`
    },
    {
      title: 'Freshness, scale &amp; cost',
      body: `<ul>
        <li><b>Incremental ingestion</b> — watch folders, CDC from databases, scheduled jobs</li>
        <li><b>Versioning</b> — re-embed only changed docs, not the whole corpus</li>
        <li><b>Cost</b> — embedding APIs cost per token; index RAM/SSD scales with vectors × dimensions × 4 bytes</li>
        <li><b>Tiers</b> — hot index in RAM/SSD, corpus in object storage, cold in archive</li>
      </ul>
      <p>Freshness is the difference between "demo bot" and "production system". Lead with it.</p>`
    }
  ],
  terms: [
    { term: 'ETL / ELT', def: 'Extract, Transform, Load — moving and cleaning data into the index.' },
    { term: 'OCR', def: 'Optical character recognition — turning scanned images into text.' },
    { term: 'PII', def: 'Personally identifiable information — redact/restrict before embedding.' },
    { term: 'ANN', def: 'Approximate nearest neighbor search — fast at scale, slight recall cost.' },
    { term: 'BM25', def: 'Keyword ranking algorithm; the exact-match partner of vector search.' },
    { term: 'CDC', def: 'Change Data Capture — streaming database changes into the index.' }
  ],
  quiz: [
    { q: 'Why parse scanned PDFs before chunking?',
      options: ['To reduce file size', 'OCR is needed to get text out of images', 'To make embeddings faster', 'PDFs cannot be stored in vector DBs'],
      correct: 1, explain: 'Scanned PDFs are images — OCR converts them to searchable text first.' },
    { q: 'HNSW indexing trades what for what?',
      options: ['Some recall for much faster search at scale', 'Accuracy for bigger models', 'Latency for accuracy', 'Nothing — it is exact search'],
      correct: 0, explain: 'Like all ANN, HNSW exchanges a little recall for speed and scale.' },
    { q: 'Pure vector search struggles with exact product codes. The fix is:',
      options: ['More GPUs', 'Hybrid search (add BM25)', 'Smaller embeddings', 'Deleting the metadata'],
      correct: 1, explain: 'BM25 catches exact tokens that semantic vectors miss.' },
    { q: 'Who is responsible for PII handling in a customer RAG project?',
      options: ['Only the customer\u2019s legal team', 'Nobody — embeddings are private', 'The solution architect must raise and design for it in discovery', 'The GPU vendor'],
      correct: 2, explain: 'You design it, you own raising it. Governance is part of the architecture.' }
  ],
  activity: {
    title: 'Design an enterprise ingestion pipeline',
    goal: 'A one-page architecture you can present in an interview or discovery call.',
    steps: [
      'Scenario: a bank with 2M documents (scanned PDFs, Word, Excel, email)',
      'Draw the pipeline: sources → parsing → cleaning → chunking → embedding → index',
      'Decide: OCR needed? which chunks? HNSW or IVF? hybrid search? metadata fields?',
      'Add a freshness schedule and 3 compliance checkpoints (PII, access control, retention)'
    ]
  },
  resources: [
    { label: 'Unstructured.io docs', url: 'https://docs.unstructured.io/', note: 'Open-source enterprise document parsing' },
    { label: 'Pinecone — vector index basics', url: 'https://www.pinecone.io/learn/vector-database/', note: 'ANN, HNSW, quantization explained' },
    { label: 'Qdrant docs', url: 'https://qdrant.tech/documentation/', note: 'Practical hybrid search + filters' }
  ]
},

/* ------------------------------ M5 ------------------------------ */
{
  id: 'm5', num: '05',
  title: 'GPU &amp; Compute Fundamentals',
  tagline: 'Read a spec sheet like a native',
  week: 'Week 5 · ~7 hrs', icon: '🖥', color: '#22d3ee',
  objectives: [
    'Read a GPU spec sheet and explain what actually matters',
    'Compare A100, H100, H200, L40S, B200 and MI300X',
    'Understand NVLink, PCIe and the GPU-communication bottleneck',
    'Speak power, cooling and GPU sharing credibly'
  ],
  lessons: [
    {
      title: 'Why GPUs win at AI',
      body: `<p>Transformers are <b>matrix math</b> — massive parallel multiply-accumulate. GPUs have thousands of small cores (<b>SIMT</b>) for exactly this, plus <b>tensor cores</b> that do matrix ops in hardware.</p>
      <p>CPU: ~10–100 cores, great at general logic. GPU: ~10,000+ cores, great at parallel math. Training and serving LLMs is parallel math → GPUs. This one sentence explains the entire datacenter boom.</p>`
    },
    {
      title: 'Spec sheet decoder',
      body: `<p>Four numbers to always read:</p>
      <ul>
        <li><b>VRAM (GB)</b> — the hard limit on model + KV cache size</li>
        <li><b>Memory bandwidth (GB/s)</b> — decode speed; the real inference bottleneck</li>
        <li><b>FP16/BF16/INT8 FLOPS/TOPS</b> — compute throughput; matters for prefill and training</li>
        <li><b>TDP (W)</b> — power draw → cooling and power design (customers budget this!)</li>
      </ul>
      <p>Plus form factor: <b>SXM</b> (datacenter module, NVLink) vs <b>PCIe</b> (card, cheaper, less interconnect).</p>`
    },
    {
      title: 'The current lineup (verified specs)',
      body: `<div class="table-wrap"><table class="cs-table">
        <thead><tr><th>GPU</th><th>VRAM</th><th>Bandwidth</th><th>FP16 dense</th><th>TDP</th></tr></thead>
        <tbody>
          <tr><td>A100 SXM</td><td>80 GB</td><td>2,039 GB/s</td><td>312 TFLOPS</td><td>400 W</td></tr>
          <tr><td>H100 SXM</td><td>80 GB</td><td>3,350 GB/s</td><td>989 TFLOPS</td><td>700 W</td></tr>
          <tr><td>H200</td><td>141 GB</td><td>4,800 GB/s</td><td>989 TFLOPS</td><td>700 W</td></tr>
          <tr><td>L40S</td><td>48 GB</td><td>864 GB/s</td><td>362 TFLOPS</td><td>350 W</td></tr>
          <tr><td>B200</td><td>~192 GB</td><td>~8,000 GB/s</td><td>2,250 TFLOPS</td><td>1,000 W</td></tr>
          <tr><td>MI300X</td><td>192 GB</td><td>5,300 GB/s</td><td>1,307 TFLOPS</td><td>750 W</td></tr>
        </tbody></table></div>
      <p>Rule of thumb: <b>H200 = H100 compute + 76% more memory</b> (great for serving 70B+); L40S is the price/perf sweet spot for mid workloads; B200 is the new flagship.</p>`
    },
    {
      title: 'The host matters too',
      body: `<p>A GPU server is more than GPUs:</p>
      <ul>
        <li>2× CPUs (e.g. EPYC / Xeon) — feeding data, running control plane</li>
        <li>DDR5 RAM — 1–2 TB in big nodes</li>
        <li>NVMe SSDs — boot, datasets, checkpoints</li>
        <li>NICs — 200/400/800 GbE or InfiniBand for cluster traffic (Module 7)</li>
      </ul>
      <p>Customers sometimes buy cheap CPUs + GPUs and wonder why training is slow — the whole server must be balanced.</p>`
    },
    {
      title: 'GPU-to-GPU: NVLink, NVSwitch, PCIe',
      body: `<ul>
        <li><b>PCIe Gen5</b> ≈ 64 GB/s per x16 slot — fine for storage, slow for GPU comms</li>
        <li><b>NVLink</b> — high-speed GPU-to-GPU: 600 GB/s (A100), 900 GB/s (H100), 1.8 TB/s (B200)</li>
        <li><b>NVSwitch</b> — connects all 8 GPUs in a pod as a full mesh → an 8-GPU H100 node behaves like one big GPU</li>
      </ul>
      <p>Why it matters: distributed training runs <b>all-reduce</b> (gradient sync) constantly. If GPU-to-GPU links are slow, GPUs idle waiting — this is where networking (Module 7) meets compute.</p>`
    },
    {
      title: 'Sharing, power &amp; cooling',
      body: `<ul>
        <li><b>MIG</b> — split one GPU into hardware-isolated slices (e.g. 7× smaller GPUs from an H100)</li>
        <li><b>Time-slicing / vGPU</b> — share a GPU over time; less isolation</li>
        <li><b>Power</b> — H100 ≈ 700 W; an 8-GPU server ≈ 10–14 kW with CPUs → dense racks need <b>liquid cooling</b> (40–60 kW/rack)</li>
        <li>Idle GPUs burn power and money — utilization is a customer obsession; multi-tenant GPU (Module 12) is the answer</li>
      </ul>
      <p>Saying "power and cooling are part of the TCO" in a sizing call marks you as senior.</p>`
    }
  ],
  terms: [
    { term: 'Tensor cores', def: 'GPU hardware dedicated to matrix multiply — the heart of transformer compute.' },
    { term: 'VRAM', def: 'GPU memory; hard limit on model weights + KV cache that fits.' },
    { term: 'FLOPS / TOPS', def: 'Floating-point / integer operations per second — compute throughput.' },
    { term: 'NVLink', def: 'High-speed GPU-to-GPU interconnect (900 GB/s on H100).' },
    { term: 'MIG', def: 'Multi-Instance GPU — hardware-sliced partitions of one GPU.' },
    { term: 'TDP', def: 'Thermal design power (watts) — drives power &amp; cooling design.' }
  ],
  quiz: [
    { q: 'Which spec most limits which LLM you can serve on a single GPU?',
      options: ['TDP', 'VRAM', 'CPU cores', 'Network ports'],
      correct: 1, explain: 'Weights + KV cache must fit in VRAM — the hard physical limit.' },
    { q: 'NVLink exists to:',
      options: ['Connect GPUs to storage', 'Speed up GPU-to-GPU communication (gradient sync, model parallelism)', 'Replace the CPU', 'Provide internet access'],
      correct: 1, explain: 'NVLink/NVSwitch make an 8-GPU pod behave like one big GPU.' },
    { q: 'MIG allows you to:',
      options: ['Overclock a GPU', 'Partition one physical GPU into isolated slices', 'Connect GPUs over the internet', 'Run models without VRAM'],
      correct: 1, explain: 'MIG = hardware-level GPU partitioning for sharing and multi-tenancy.' },
    { q: 'An H100\u2019s ~700 W TDP matters to customers because:',
      options: ['It affects compute only', 'It drives power and cooling design — part of TCO', 'It is a marketing number with no effect', 'It determines VRAM'],
      correct: 1, explain: 'Power/cooling is a real budget line — raise it in sizing conversations.' }
  ],
  activity: {
    title: 'The GPU comparison table',
    goal: 'Walk into any sizing conversation able to compare GPUs instantly.',
    steps: [
      'From memory, write the A100 vs H100 vs H200 vs L40S rows: VRAM, bandwidth, FP16, TDP',
      'Explain in 3 sentences why H200 is popular for serving 70B models',
      'Spec a server to serve a 13B model to 100 concurrent users — pick GPU, count, and justify',
      'Compute the power estimate for an 8×H100 rack and note the cooling implication'
    ]
  },
  resources: [
    { label: 'NVIDIA data center GPU specs', url: 'https://www.nvidia.com/en-us/data-center/', note: 'Current official spec sheets' },
    { label: 'NVIDIA DLI self-paced courses', url: 'https://www.nvidia.com/en-us/training/self-paced-courses/', note: 'Free accelerated computing &amp; AI infrastructure courses' },
    { label: 'Inference engineering: H100 vs A100', url: 'https://inferenceengineering.tech/learn/gpu-inference/', note: 'Why bandwidth > FLOPS for decode' }
  ]
}
];
