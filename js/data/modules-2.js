/* ============================================================
   AI Presales Academy — Syllabus content, part 2 (modules 6–12)
   ============================================================ */
window.MODULES_2 = [

/* ------------------------------ M6 ------------------------------ */
{
  id: 'm6', num: '06',
  title: 'Storage for AI Workloads',
  tagline: 'GPUs idle when storage is slow — win the bottleneck argument',
  week: 'Week 6 · ~5 hrs', icon: '💾', color: '#facc15',
  objectives: [
    'Explain why storage is a top-3 bottleneck in AI systems',
    'Know IOPS vs throughput vs latency — and which AI phase cares about which',
    'Compare local NVMe, object storage, NAS and parallel file systems',
    'Size checkpoints, datasets and RAG indexes like a pro'
  ],
  lessons: [
    {
      title: 'Storage in the AI stack',
      body: `<p>Four workloads hammer storage differently:</p>
      <ul>
        <li><b>Datasets</b> — big sequential reads while training starts / data loads</li>
        <li><b>Checkpoints</b> — periodic full-model writes; bursty, huge</li>
        <li><b>Model weights</b> — small, but loaded on every GPU boot</li>
        <li><b>RAG indexes / vector DBs</b> — high IOPS, low latency, SSD-class</li>
      </ul>
      <p>The failure mode customers feel: <b>GPUs idle waiting for data</b>. Storage is often the silent deal-killer — or the place you add value.</p>`
    },
    {
      title: 'Metrics that matter',
      body: `<ul>
        <li><b>IOPS</b> — small random operations/sec (vector DB lookups, metadata)</li>
        <li><b>Throughput (GB/s)</b> — large sequential transfer (checkpoints, datasets)</li>
        <li><b>Latency (ms)</b> — how fast the first byte arrives (model load, small reads)</li>
        <li><b>Capacity &amp; durability</b> — TB, replication/erasure coding, availability</li>
      </ul>
      <p>Interview classic: <i>"Training is throughput-hungry; RAG is latency-hungry."</i> Say it like that.</p>`
    },
    {
      title: 'Storage tiers &amp; technologies',
      body: `<ul>
        <li><b>Local NVMe</b> — fastest, per-node; datasets and checkpoints staged locally</li>
        <li><b>NAS / SAN</b> — shared filesystems; simple, but can bottleneck at scale</li>
        <li><b>Object storage (S3-compatible)</b> — cheap, elastic, the data lake; not for low-latency random I/O</li>
        <li><b>Parallel file systems</b> — Lustre, WEKA, IBM GPFS, VAST — many nodes read/write concurrently without a single bottleneck; the standard for multi-node training</li>
        <li><b>Flash vs HDD vs QLC</b> — cost per GB vs performance; customers will always ask</li>
      </ul>`
    },
    {
      title: 'Checkpoints — the bursty killer',
      body: `<p>Every N minutes (e.g. 15–30) training saves a full model state. A 70B FP16 checkpoint ≈ <b>140+ GB</b>; with optimizer states, far more.</p>
      <p>If the cluster writes 140 GB at 10 GB/s that's 14 seconds of all GPUs paused; at 50 GB/s it's under 3 seconds. <b>Checkpoint storm</b> (all nodes saving at once) is a classic design problem.</p>
      <p>Fixes you can name: async checkpointing, larger save intervals, high-throughput scratch tier, local NVMe + background sync.</p>`
    },
    {
      title: 'Storage for RAG &amp; vector DBs',
      body: `<p>RAG storage is different from training storage:</p>
      <ul>
        <li>Vector index: <b>RAM/SSD-hot</b>, high IOPS — index size ≈ vectors × dims × ~4–8 bytes</li>
        <li>Source corpus: <b>object storage</b> — cheap, versioned, the "source of truth"</li>
        <li>Embedding/cache layers: SSD</li>
        <li>Cold archive: object storage lifecycle policies</li>
      </ul>
      <p>Architecture sentence: <i>"Hot index, warm corpus, cold archive — with caching between."</i></p>`
    }
  ],
  terms: [
    { term: 'IOPS', def: 'Small random operations/sec — what vector DBs and metadata need.' },
    { term: 'Throughput', def: 'GB/s of sequential transfer — what checkpoints and datasets need.' },
    { term: 'NVMe', def: 'PCIe-attached flash; the fast local tier in AI servers.' },
    { term: 'Object storage', def: 'S3-compatible, cheap, elastic — the data lake / corpus tier.' },
    { term: 'Parallel file system', def: 'Lustre / WEKA / GPFS — many nodes, no single bottleneck.' },
    { term: 'Checkpoint', def: 'Periodic full model-state save; a bursty throughput killer.' }
  ],
  quiz: [
    { q: 'A training cluster is most sensitive to which storage property?',
      options: ['Latency for tiny reads', 'Throughput and checkpoint bandwidth', 'Number of buckets', 'Encryption overhead'],
      correct: 1, explain: 'Datasets and checkpoints are big sequential transfers.' },
    { q: 'A 70B FP16 checkpoint is roughly:',
      options: ['14 GB', '140 GB', '1.4 TB', '14 TB'],
      correct: 1, explain: '70B params × 2 bytes = ~140 GB per save, every checkpoint.' },
    { q: 'Object storage is ideal for:',
      options: ['Low-latency vector DB hot lookups', 'Cheap, scalable capacity for corpora', 'Replacements for GPU memory', 'Interconnect between GPUs'],
      correct: 1, explain: 'Object storage = capacity and cost; not low-latency random I/O.' },
    { q: 'Why do multi-node training clusters use parallel file systems?',
      options: ['They are the cheapest option', 'Many nodes can read/write concurrently without a single bottleneck', 'They work over Wi-Fi', 'They store models inside GPUs'],
      correct: 1, explain: 'NAS becomes the bottleneck at scale; parallel FS scales bandwidth with nodes.' }
  ],
  activity: {
    title: 'Storage sizing drill',
    goal: 'Produce storage numbers on the spot — a frequent customer question.',
    steps: [
      'Compute checkpoint write time for 140 GB at 10 GB/s vs 50 GB/s (show the math)',
      'Design storage for a 4-node, 8-GPU-per-node training cluster: local NVMe + shared tier + object tier',
      'Estimate a vector index size for 10M chunks × 768 dims (10M × 768 × 4 bytes ≈ 30 GB, plus overhead)',
      'Choose tiers for a 10 TB RAG corpus and justify each decision'
    ]
  },
  resources: [
    { label: 'WEKA — storage for AI', url: 'https://www.weka.io/learn/', note: 'White papers on AI storage patterns' },
    { label: 'Lustre overview', url: 'https://www.lustre.org/', note: 'The parallel file system behind most HPC/AI clusters' },
    { label: 'NVMe explained', url: 'https://www.nvidia.com/en-us/data-center/nvme/', note: 'NVMe + GPUDirect patterns' }
  ]
},

/* ------------------------------ M7 ------------------------------ */
{
  id: 'm7', num: '07',
  title: 'Networking for AI',
  tagline: 'The "AI fabric" problem nobody expects a fresher to know',
  week: 'Week 7 · ~6 hrs', icon: '🌐', color: '#4ade80',
  objectives: [
    'Explain the east-west traffic problem in AI clusters',
    'Know Ethernet vs InfiniBand vs RoCE at a customer level',
    'Understand why RDMA and NCCL matter',
    'Design secure network segmentation for AI workloads'
  ],
  lessons: [
    {
      title: 'Networking basics refresher',
      body: `<ul>
        <li><b>IP &amp; subnets</b> — how devices address each other; VLANs isolate traffic</li>
        <li><b>L2 vs L3</b> — switching (within a network) vs routing (between networks)</li>
        <li><b>Bandwidth</b> — bits/sec; <b>latency</b> — time per round trip; both matter</li>
        <li><b>NIC</b> — the network card; AI servers ship 200/400/800 GbE or InfiniBand</li>
      </ul>
      <p>You don't need to be a network engineer — you need to be fluent in the vocabulary and the trade-offs.</p>`
    },
    {
      title: 'The AI traffic problem',
      body: `<p>Model-parallel training constantly syncs gradients between GPUs (<b>all-reduce</b>). Inside one node, NVLink handles it. <b>Across nodes, the network handles it — and it floods.</b></p>
      <p>This "east-west" (server-to-server) traffic is completely different from typical web workloads (north-south, client-to-server). AI clusters are designed around <b>east-west bandwidth</b>.</p>
      <p>Memorable line: <i>"In AI, the network is a system component, not a utility."</i></p>`
    },
    {
      title: 'RDMA &amp; NCCL',
      body: `<ul>
        <li><b>RDMA</b> — Remote Direct Memory Access: data moves GPU-to-GPU <i>without the CPU</i> (kernel bypass) → far lower latency and CPU load</li>
        <li><b>NCCL</b> — NVIDIA's collective-communication library that uses RDMA for all-reduce, all-gather etc.</li>
        <li>RDMA needs a <b>lossless</b> fabric — dropped packets would stall training — hence InfiniBand or RoCE (RDMA over Converged Ethernet) with flow control</li>
      </ul>
      <p>Interview line: <i>"NCCL + RDMA is why AI clusters need lossless, high-bandwidth fabrics."</i></p>`
    },
    {
      title: 'Ethernet vs InfiniBand vs RoCE',
      body: `<div class="table-wrap"><table class="cs-table">
        <thead><tr><th></th><th>InfiniBand</th><th>Ethernet (RoCE)</th></tr></thead>
        <tbody>
          <tr><td>Bandwidth</td><td>NDR 400/800 Gb/s per port</td><td>400/800 GbE</td></tr>
          <tr><td>Losslessness</td><td>Native</td><td>Needs RoCE + flow control</td></tr>
          <tr><td>Cost</td><td>Higher</td><td>Lower, familiar ops</td></tr>
          <tr><td>Fit</td><td>Maximum training perf (HPC heritage)</td><td>Flexible, mixed workloads</td></tr>
        </tbody></table></div>
      <p>Trend: <b>Ethernet keeps closing the gap</b> (NVIDIA Spectrum-X, Ultra Ethernet Consortium). Customers weigh cost vs peak training performance. Saying "RoCE can deliver ~95% of the perf at lower cost for many workloads" sounds great.</p>`
    },
    {
      title: 'Fabric design &amp; oversubscription',
      body: `<ul>
        <li><b>Spine-leaf</b> — the standard design: every leaf switch connects to every spine; scale-out</li>
        <li><b>Fat-tree</b> — full bisection bandwidth topology from HPC</li>
        <li><b>Oversubscription</b> — ratio of downlink to uplink capacity. 3:1 is fine for web; <b>1:1 (non-blocking) is what training wants</b></li>
        <li>Typical AI cluster: separate fabrics for <b>compute/training</b>, <b>storage</b>, and <b>management</b></li>
      </ul>
      <p>Ask customers: "what's your oversubscription ratio?" — it instantly filters who has designed for AI.</p>`
    },
    {
      title: 'Security &amp; segmentation for AI services',
      body: `<ul>
        <li>Separate training, inference and management networks (blast-radius control)</li>
        <li><b>WAF / API gateways</b> in front of inference APIs (prompt injection is a web attack!)</li>
        <li>TLS everywhere; mTLS between services</li>
        <li><b>Egress control</b> — what data can the model/service send out? (data-governance favorite)</li>
        <li>Cloud: VPC + private links; on-prem: VLANs + firewalls between zones</li>
      </ul>
      <p>Security is a presales differentiator: <i>"show me your data flow and I'll show you where the risk is."</i></p>`
    }
  ],
  terms: [
    { term: 'RDMA', def: 'Direct GPU-to-GPU memory access without the CPU — low latency.' },
    { term: 'NCCL', def: 'NVIDIA\u2019s collective-communication library (all-reduce, etc.).' },
    { term: 'InfiniBand', def: 'High-bandwidth, natively lossless fabric — training peak performance.' },
    { term: 'RoCE', def: 'RDMA over Converged Ethernet — lossless Ethernet for AI.' },
    { term: 'Spine-leaf', def: 'Standard scale-out network topology; every leaf reaches every spine.' },
    { term: 'Oversubscription', def: 'Downlink:uplink ratio — 1:1 (non-blocking) is what training needs.' }
  ],
  quiz: [
    { q: 'The dominant traffic pattern in distributed AI training is:',
      options: ['North-south client traffic', 'East-west gradient sync between GPUs', 'Broadcast video streaming', 'DNS queries'],
      correct: 1, explain: 'All-reduce gradient sync floods the east-west fabric — the AI-specific problem.' },
    { q: 'NCCL is best described as:',
      options: ['A GPU model', 'NVIDIA\u2019s collective communication library used by distributed training', 'A network switch', 'A storage protocol'],
      correct: 1, explain: 'NCCL = the library that drives all-reduce/all-gather across GPUs.' },
    { q: 'Why does RDMA need a lossless fabric?',
      options: ['Because packets are encrypted', 'Dropped packets would stall training; losslessness avoids retransmission stalls', 'To save electricity', 'Because switches are cheap'],
      correct: 1, explain: 'Retransmissions on lossy fabric cripple synchronized training steps.' },
    { q: 'A 3:1 oversubscribed fabric is fine for web apps but poor for training because:',
      options: ['It costs more', 'Uplink capacity is lower than demand → collective traffic stalls', 'It uses too much power', 'It is hard to manage'],
      correct: 1, explain: 'Training wants 1:1 (non-blocking) east-west bandwidth.' }
  ],
  activity: {
    title: 'Draw the AI data center network',
    goal: 'A credible network diagram you can sketch in interviews.',
    steps: [
      'Draw a spine-leaf fabric for a 2-node, 16-GPU training cluster (compute fabric)',
      'Add a separate storage fabric and a management network',
      'Label where a firewall / WAF sits in front of the inference API',
      'Answer: would you quote InfiniBand or RoCE for this customer, and why?'
    ]
  },
  resources: [
    { label: 'NVIDIA networking for AI', url: 'https://www.nvidia.com/en-us/networking/', note: 'Quantum (IB) &amp; Spectrum-X (Ethernet) product pages' },
    { label: 'RoCE explained', url: 'https://docs.nvidia.com/networking/display/rocev2', note: 'RDMA over converged Ethernet — deep dive' },
    { label: 'Ultra Ethernet Consortium', url: 'https://ultraethernet.org/', note: 'The industry push for AI-scale Ethernet' }
  ]
},

/* ------------------------------ M8 ------------------------------ */
{
  id: 'm8', num: '08',
  title: 'Virtualization, Containers &amp; Kubernetes',
  tagline: 'Every AI deployment story ends on K8s',
  week: 'Week 8 · ~7 hrs', icon: '🐳', color: '#60a5fa',
  objectives: [
    'Contrast VMs vs containers — and when each is right',
    'Explain how GPUs get into containers (driver, toolkit, device plugin)',
    'Know how Kubernetes schedules and shares GPUs',
    'Map deployment models: on-prem, private cloud, edge, hybrid'
  ],
  lessons: [
    {
      title: 'VMs vs containers',
      body: `<ul>
        <li><b>VM</b> — virtualizes hardware; each guest runs a full OS. Strong isolation, more overhead, slow start</li>
        <li><b>Container</b> — shares the host kernel; packages app + runtime + deps. Light, fast, portable</li>
        <li>AI stacks ship as containers (NVIDIA NGC images) — that's why customers need container skills</li>
      </ul>
      <p>Analogy: VM = separate house with its own plumbing; container = apartment sharing the building's infrastructure.</p>`
    },
    {
      title: 'GPUs in containers',
      body: `<p>Three layers make GPU containers work:</p>
      <ul>
        <li><b>NVIDIA driver</b> — installed on the host</li>
        <li><b>nvidia-container-toolkit</b> — lets containers see the GPU (device passthrough)</li>
        <li><b>NGC containers</b> — prebuilt images with CUDA + frameworks (PyTorch, Triton, vLLM)</li>
      </ul>
      <p>A <code>Dockerfile</code> for a model server is 15 lines — being able to write one sets you apart from pure "talkers".</p>`
    },
    {
      title: 'Kubernetes essentials',
      body: `<ul>
        <li><b>Pods</b> — smallest unit; one or more containers</li>
        <li><b>Nodes</b> — the servers; kubelet runs on each</li>
        <li><b>Deployments / Services</b> — desired state + stable networking</li>
        <li><b>Scheduler</b> — places pods on nodes with enough resources</li>
        <li><b>GPU device plugin</b> — exposes GPUs as schedulable resources (<code>nvidia.com/gpu</code>)</li>
      </ul>
      <p>Interview line: <i>"Without the device plugin, Kubernetes doesn't know GPUs exist."</i></p>`
    },
    {
      title: 'GPU sharing &amp; multi-tenancy',
      body: `<p>The JD asks for "exposure to multi-tenant GPU environments" — here's the vocabulary:</p>
      <ul>
        <li><b>MIG</b> — hardware-isolated slices (strong isolation, static)</li>
        <li><b>Time-slicing</b> — share a GPU over time (flexible, weaker isolation)</li>
        <li><b>vGPU</b> — virtualization for shared GPGPU</li>
        <li><b>Namespaces + ResourceQuotas</b> — per-team limits, fairness, billing/showback</li>
      </ul>
      <p>Customer pain you can name: noisy neighbors, fairness, chargeback — every multi-tenant platform needs all three answered.</p>`
    },
    {
      title: 'AI platforms on Kubernetes',
      body: `<p>The JD's "AI orchestration tools" in deployment form:</p>
      <ul>
        <li><b>KServe</b> — standard Kubernetes inference serving (can wrap vLLM/Triton)</li>
        <li><b>Ray</b> — distributed Python for training and serving at scale</li>
        <li><b>Kubeflow</b> — the classic ML platform on K8s (pipelines, training, serving)</li>
        <li>Managed platforms (NVIDIA NIM, Red Hat, cloud AI platforms) exist for customers without K8s ops skills</li>
      </ul>
      <p>Honesty wins: <i>"Kubernetes is powerful but complex; for a 10-person IT team, a managed layer is often the right architecture."</i></p>`
    },
    {
      title: 'Deployment models — the JD explicitly asks',
      body: `<ul>
        <li><b>On-prem</b> — full control, data stays home, CapEx; needs ops skills</li>
        <li><b>Private cloud</b> — on-prem but multi-tenant/platform; OpEx-ish; shared cost</li>
        <li><b>Edge</b> — inference near cameras/devices: low latency, offline, small models (Module 12)</li>
        <li><b>Hybrid</b> — burst to public cloud, keep sensitive data on-prem</li>
      </ul>
      <p>Decision criteria to name: data residency, latency, cost, skills, scale, compliance. Then recommend — presales is about <i>a</i> recommendation, not a menu.</p>`
    }
  ],
  terms: [
    { term: 'Container', def: 'App + runtime + deps sharing the host kernel — light and portable.' },
    { term: 'Pod', def: 'Kubernetes\u2019 smallest deployable unit (one or more containers).' },
    { term: 'Device plugin', def: 'K8s extension exposing GPUs as schedulable resources.' },
    { term: 'MIG', def: 'Hardware-isolated GPU slices — strong multi-tenant isolation.' },
    { term: 'Time-slicing', def: 'Sharing a GPU over time — flexible but weaker isolation.' },
    { term: 'Edge', def: 'Inference deployed close to data sources: low latency, offline capable.' }
  ],
  quiz: [
    { q: 'Compared to VMs, containers:',
      options: ['Virtualize hardware and run full OSes', 'Share the host kernel — lighter, faster, more portable', 'Are always less secure', 'Cannot run GPUs'],
      correct: 1, explain: 'Kernel sharing = lightweight + fast; isolation is weaker, which is why VMs still exist.' },
    { q: 'What makes a GPU visible inside a container?',
      options: ['The device plugin only', 'nvidia-container-toolkit (host driver + toolkit + device plugin stack)', 'Rebuilding the kernel', 'A GPU in the Dockerfile'],
      correct: 1, explain: 'Host driver + nvidia-container-toolkit pass the GPU through; in K8s the device plugin advertises it.' },
    { q: 'For strong isolation between AI tenants on one GPU, choose:',
      options: ['Time-slicing', 'MIG', 'Round-robin scheduling', 'More CPU'],
      correct: 1, explain: 'MIG = hardware isolation; time-slicing = sharing without isolation.' },
    { q: 'A bank with strict data residency and 200 ms latency needs for fraud detection should deploy:',
      options: ['Public cloud only', 'On-prem / private cloud — data stays in-country', 'Edge at the ATM/terminal', 'Any option — it makes no difference'],
      correct: 2, explain: 'Latency near the transaction + residency → edge (with on-prem central training).' }
  ],
  activity: {
    title: 'Container + K8s hands-on (free)',
    goal: 'Real muscle memory, not just vocabulary.',
    steps: [
      'Install Docker and run an official NVIDIA CUDA container with GPU access (nvidia-smi inside)',
      'Write a 15-line Dockerfile that runs a tiny model server',
      'Follow a free Kubernetes intro (KodeKloud or Kubernetes docs) and deploy one GPU pod using the device plugin',
      'List 3 multi-tenant concerns (isolation, quotas, chargeback) and one mitigation each'
    ]
  },
  resources: [
    { label: 'Kubernetes docs — GPU support', url: 'https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/', note: 'Device plugin walkthrough' },
    { label: 'KodeKloud CKA course', url: 'https://kodekloud.com/courses/cka-certification-course-certified-kubernetes-administrator', note: 'Hands-on K8s (free intro path exists)' },
    { label: 'NVIDIA MIG user guide', url: 'https://docs.nvidia.com/datacenter/tesla/mig-user-guide/', note: 'GPU slicing deep dive' }
  ]
},

/* ------------------------------ M9 ------------------------------ */
{
  id: 'm9', num: '09',
  title: 'Sizing, Solution Architecture &amp; BOM',
  tagline: 'The core deliverable: numbers that survive scrutiny',
  week: 'Week 9 · ~10 hrs', icon: '📐', color: '#f87171',
  objectives: [
    'Run a sizing conversation (users, concurrency, latency, accuracy, data)',
    'Do back-of-envelope GPU math for inference and training',
    'Produce an HLD, an LLD and a priced BOM',
    'Compare deployment models and build a TCO story'
  ],
  lessons: [
    {
      title: 'Requirements gathering — the numbers that drive size',
      body: `<p>Before any math, get the inputs (ask these in every discovery):</p>
      <ul>
        <li>How many <b>users</b>? What % online at peak (<b>concurrency</b>)?</li>
        <li>Average prompt + response length (tokens)?</li>
        <li><b>Latency targets</b>: TTFT &lt; 1–2 s, TPOT for streaming?</li>
        <li><b>Throughput</b> need: tokens/sec at peak</li>
        <li>Accuracy bar, data volume, growth %, budget &amp; timeline</li>
      </ul>
      <p>Rule: <b>size for peak, plan for growth, sanity-check with the customer's own numbers.</b></p>`
    },
    {
      title: 'Inference sizing math',
      body: `<p>Back-of-envelope, 5 steps (see Cheat Sheet for the formulas):</p>
      <ul>
        <li>1. Peak concurrency = users × %online × requests/user</li>
        <li>2. Demand (tokens/s) = concurrency × tokens per response ÷ target seconds</li>
        <li>3. GPUs = demand ÷ per-GPU throughput (published: 7–8B ≈ 1.5–3.5k tok/s on one H100 at batch 16–32)</li>
        <li>4. Multiply by <b>1.5–2× headroom</b></li>
        <li>5. Verify VRAM fit: weights + KV cache + overhead ≤ GPU memory</li>
      </ul>
      <p>Example you can quote: 500 users, 10% concurrent, 30 requests/user/hour, 500-token outputs → ~25 concurrent → ~350 tokens/s → 1 GPU (7B).</p>`
    },
    {
      title: 'Training sizing math',
      body: `<p>Rough training time (for 1000s of GPU-hours discussions):</p>
      <div class="formula">Tokens × 6 × parameters ÷ (GPU FLOPS × utilization)</div>
      <p>Examples: fine-tuning 7B on 1M tokens on one H100 (989 TFLOPS FP16, ~40% util): 1e6 × 6 × 7e9 ÷ (989e12 × .4) ≈ 106 s of pure compute — realistically minutes to hours with data loading. A full pretraining run of a 70B on trillions of tokens needs <b>hundreds of H100s for months</b> — nobody presells that; you say "pretraining is out of scope, fine-tuning is the standard".</p>
      <p>Memory for training: model + gradients + optimizer states — AdamW mixed-precision ≈ <b>16–20 bytes/param</b> (vs 2 for inference). That's why fine-tuning a 70B needs a cluster (or QLoRA).</p>`
    },
    {
      title: 'HLD vs LLD — know the difference cold',
      body: `<ul>
        <li><b>HLD</b> — what &amp; why: components, integrations, data flow, security zones, deployment model, sizing summary. 1–2 pages + a diagram. <b>For the customer's architects and CIO.</b></li>
        <li><b>LLD</b> — exact how: IPs, ports, configs, K8s namespaces, resource limits, SKUs, runbooks. <b>For the delivery team.</b></li>
      </ul>
      <p>The JD literally lists "Build high-level and low-level designs" — expect an interview question that says "walk me through your HLD process."</p>`
    },
    {
      title: 'The BOM (bill of materials)',
      body: `<p>The priced shopping list — every line a customer question:</p>
      <ul>
        <li><b>Compute</b> — servers × GPUs (model + count), CPUs, RAM</li>
        <li><b>Storage</b> — NVMe, parallel FS or object storage, capacity + performance tier</li>
        <li><b>Networking</b> — NICs, switches, fabric (IB or RoCE), cables</li>
        <li><b>Software</b> — OS, container platform, MLOps, inference engines, model licenses</li>
        <li><b>Services</b> — implementation, integration, training, support, SLAs</li>
        <li><b>Power &amp; cooling</b> — often forgotten, always real</li>
      </ul>
      <p>Present as CapEx vs OpEx and add a 3–5 year TCO view — that's what the CFO reads.</p>`
    },
    {
      title: 'TCO &amp; ROI storytelling',
      body: `<ul>
        <li><b>TCO</b> = hardware + software + power/cooling + people + maintenance over 3–5 years</li>
        <li><b>ROI</b> = the business value (faster answers, fewer tickets, new revenue) minus TCO</li>
        <li>Compare: your architecture vs DIY on general cloud vs competitor — always apples-to-apples</li>
        <li>Wins: utilization improvements, multi-tenant sharing, right-sized GPUs (don't oversell)</li>
      </ul>
      <p>Presales line: <i>"I'm not here to sell the biggest GPU — I'm here to size the one that pays for itself."</i></p>`
    },
    {
      title: 'Deployment model decision',
      body: `<p>Criteria matrix to use in front of customers:</p>
      <ul>
        <li><b>Data residency / compliance</b> → on-prem or private cloud</li>
        <li><b>Latency to data</b> → edge or on-prem</li>
        <li><b>Skills &amp; ops capacity</b> → managed/cloud</li>
        <li><b>Elasticity of demand</b> → cloud or hybrid burst</li>
        <li><b>Cost over time</b> → on-prem wins at sustained high utilization</li>
      </ul>
      <p>Recommend <b>one</b> answer with justification. Ambiguity is a consulting failure; a recommendation is the product.</p>`
    }
  ],
  terms: [
    { term: 'TTFT', def: 'Time to first token — perceived responsiveness of chat UX.' },
    { term: 'TPOT', def: 'Time per output token — streaming speed during generation.' },
    { term: 'BOM', def: 'Bill of materials: compute + storage + network + software + services.' },
    { term: 'HLD / LLD', def: 'High-level (what/why) vs low-level (exact configs and SKUs) design.' },
    { term: 'CapEx / OpEx', def: 'Capital (buy) vs operational (rent/run) expenditure.' },
    { term: 'TCO', def: 'Total cost of ownership over 3–5 years incl. power, cooling, people.' }
  ],
  quiz: [
    { q: 'TTFT matters most because:',
      options: ['It sets storage size', 'It is what users feel as responsiveness', 'It determines model quality', 'It is a licensing metric'],
      correct: 1, explain: 'Sub-second to ~2 s first token = "instant" to users; longer = perceived slowness.' },
    { q: 'Serving a 70B FP16 model requires approximately:',
      options: ['1× L40S', '2× H100/H200 (or 1× H100 with FP8/INT8)', '1× A100 40 GB', '4× RTX 4090'],
      correct: 1, explain: '140 GB of weights → 2× 80 GB H100s, or quantize to fit one.' },
    { q: 'An HLD answers:',
      options: ['Exact IP addresses and SKUs', 'What components exist and how they interact', 'The pricing list', 'The DNS records'],
      correct: 1, explain: 'HLD = architecture &amp; rationale; LLD = exact configs.' },
    { q: 'Which is typically part of a BOM?',
      options: ['Only GPUs', 'Servers, storage, networking, software, services, power/cooling', 'Only software licenses', 'Only training hours'],
      correct: 1, explain: 'A complete BOM covers every cost line the CFO will question.' }
  ],
  activity: {
    title: 'Full case study — enterprise RAG platform',
    goal: 'One complete, portfolio-worthy sizing + architecture deliverable.',
    steps: [
      'Scenario: 5,000-employee company; assistant for internal knowledge; 20% concurrent; 800-token prompts, 300-token answers; TTFT &lt; 2 s',
      'Compute peak concurrency, tokens/s demand, and GPU count (show all steps)',
      'Draw the HLD: users → gateway → LLM service (vLLM on GPU) → RAG index → sources',
      'Build a BOM table: compute, storage, network, software, services with quantities',
      'Write the 3–5 year TCO story with one ROI metric'
    ]
  },
  resources: [
    { label: 'Anyscale — LLM inference performance', url: 'https://www.anyscale.com/blog/continuous-batching-llm-inference', note: 'Batching + throughput benchmarks to cite' },
    { label: 'RunPod GPU memory guide', url: 'https://www.runpod.io/articles/guides/gpu-memory-sizing-guide-for-llm-inference', note: 'VRAM sizing with real models' },
    { label: 'NVIDIA reference architectures', url: 'https://www.nvidia.com/en-us/data-center/ai-reference-architecture/', note: 'Validated HLDs to crib from' }
  ]
},

/* ------------------------------ M10 ------------------------------ */
{
  id: 'm10', num: '10',
  title: 'Presales Craft: Discovery, Demos &amp; Enablement',
  tagline: 'The soft skills that actually close deals',
  week: 'Week 10 · ~6 hrs', icon: '🤝', color: '#e879f9',
  objectives: [
    'Run a discovery call that surfaces the real requirements',
    'Structure demos and PoCs that build trust',
    'Build reusable demo kits and run partner workshops (JD items!)',
    'Communicate to executives vs engineers'
  ],
  lessons: [
    {
      title: 'Discovery frameworks',
      body: `<ul>
        <li><b>SPIN</b> — Situation, Problem, Implication, Need-payoff: ask about the problem, then make its cost tangible, then let them say what it's worth</li>
        <li><b>MEDDIC</b> — Metrics, Economic buyer, Decision criteria, Decision process, Identify pain, Champion: know who decides and how</li>
        <li><b>BANT</b> — Budget, Authority, Need, Timeline (sales; you mostly care about the technical half)</li>
      </ul>
      <p>Your job in discovery: <b>listen 70%, talk 30%</b>. Every question should produce a number you can size against.</p>`
    },
    {
      title: 'Technical discovery for AI — the killer questions',
      body: `<ul>
        <li>"Where does the data live, and who owns it?"</li>
        <li>"Who is the end user, and what does <i>good</i> look like to them?"</li>
        <li>"What latency and accuracy bars are non-negotiable?"</li>
        <li>"What security and compliance constraints apply?"</li>
        <li>"How will you measure success — and what happens if it fails?"</li>
        <li>"What's the timeline and budget for this initiative?"</li>
      </ul>
      <p>These six questions are the difference between demo-hosting and architecting.</p>`
    },
    {
      title: 'Architect-to-sell',
      body: `<p>Draw the architecture <b>in front of the customer</b> — whiteboard or shared screen. Mirror their constraints back: "you said data must stay in-country, so here's the on-prem path…"</p>
      <p>Showing your reasoning live is the fastest trust-builder in presales. It also exposes gaps early — better on a whiteboard than in the RFP.</p>`
    },
    {
      title: 'Demos that win',
      body: `<ul>
        <li><b>Story first</b>: pain → before → after. The demo serves the story, not the other way around</li>
        <li>Rehearsed but natural; know the 3 most likely failure points and how to recover</li>
        <li>Have a <b>"wow" moment</b> — one thing they'll retell their boss</li>
        <li>Use <b>their data</b> when possible (anonymized sample) — generic demos don't land</li>
        <li>Always close with: "here's how we'd run a proof of concept with you"</li>
      </ul>`
    },
    {
      title: 'PoCs that convert',
      body: `<ul>
        <li>Scope <b>one or two use cases</b> — not five</li>
        <li>Agree <b>success criteria in writing</b> before you start (this is the whole game)</li>
        <li>Timebox: 2–6 weeks, with a mid-point checkpoint</li>
        <li>Communicate progress weekly; surface risks early</li>
        <li>Deliver a written outcome: what was proven, the numbers, and next steps</li>
      </ul>
      <p>PoC failure kills deals quietly. The success criteria doc is your insurance.</p>`
    },
    {
      title: 'Demo kits &amp; reusable assets (explicit JD item)',
      body: `<p>Build once, use in 20 deals:</p>
      <ul>
        <li>A <b>canned RAG demo</b> you can point at any customer corpus</li>
        <li><b>Benchmark scripts</b> (latency/throughput on common models)</li>
        <li><b>Architecture templates</b> (HLD diagrams, security zones)</li>
        <li>A <b>sizing calculator</b> (the Module 9 math in a sheet)</li>
        <li>Demo scripts with timings, and recorded versions for remote customers</li>
      </ul>
      <p>In interviews, mention your demo kit. It's the single asset that proves you're presales-ready.</p>`
    },
    {
      title: 'Partner enablement &amp; workshops',
      body: `<ul>
        <li>Workshops: <b>show, then let them touch</b> — hands-on labs beat slideware</li>
        <li>Enablement = give partners <i>positioning</i>, not just features: what to say, to whom, when</li>
        <li>Provide demo kits + best practices so partners can sell without you in the room</li>
        <li>Measure: % of partner-led deals that pass technical review</li>
      </ul>
      <p>The JD wants "reusable demo kits and best practices" + "guide partners on positioning" — say those exact phrases in interviews.</p>`
    },
    {
      title: 'Executives vs engineers',
      body: `<ul>
        <li><b>Executives</b>: outcomes, risk, cost, timeline. Never architecture diagrams. "So what?" after every slide.</li>
        <li><b>Engineers</b>: architecture, benchmarks, security, integration. They smell marketing.</li>
        <li>Translate relentlessly: "GPU → faster answers → fewer tickets → lower cost"</li>
        <li>Use analogies (the autocomplete example, the apartment analogy) — analogies are the presales superpower</li>
      </ul>`
    }
  ],
  terms: [
    { term: 'Discovery', def: 'The listening phase: pain, constraints, numbers, decision process.' },
    { term: 'SPIN / MEDDIC', def: 'Questioning and qualification frameworks presales uses daily.' },
    { term: 'Demo kit', def: 'Reusable demo + benchmarks + templates used across deals.' },
    { term: 'PoC', def: 'Proof of concept with agreed success criteria and a timebox.' },
    { term: 'Enablement', def: 'Training partners to position and sell your solutions.' },
    { term: 'Executive summary', def: 'Outcomes, risk, cost — never diagrams.' }
  ],
  quiz: [
    { q: 'The best opening move in technical discovery is:',
      options: ['Presenting your product', 'Open questions about the business problem and current state', 'Sending the pricing sheet', 'Discussing competitors'],
      correct: 1, explain: 'Discovery = listening. Ask, then ask again, then size.' },
    { q: 'A well-scoped PoC includes:',
      options: ['Everything the customer could want', 'One or two use cases + written success criteria + a timebox', 'No success criteria — just build', 'Only a slide deck'],
      correct: 1, explain: 'Tight scope + agreed criteria = deal-moving PoC.' },
    { q: 'Reusable demo kits matter because they:',
      options: ['Replace all human selling', 'Scale you across many deals and partners without rework', 'Are required by law', 'Make demos longer'],
      correct: 1, explain: 'The JD lists them under partner enablement — reuse is the point.' },
    { q: 'For an executive audience, your slide should lead with:',
      options: ['The network topology', 'Business outcomes, risk and cost', 'Docker commands', 'Benchmark methodology'],
      correct: 1, explain: 'Executives buy outcomes; engineers buy architecture.' }
  ],
  activity: {
    title: 'Record your discovery call',
    goal: 'Practice makes presales. Do it out loud, not in your head.',
    steps: [
      'Scenario: a manufacturer wants "an AI assistant". Write 10 discovery questions (Module 10 list + your own)',
      'Script a 15-minute discovery call: 3 min intro, 10 min questions, 2 min wrap',
      'Write a 5-minute demo script with a wow moment for a RAG assistant',
      'Practice the elevator pitch: "what do you do?" in 30 seconds, no jargon'
    ]
  },
  resources: [
    { label: 'The Enterprise Presales Playbook', url: 'https://gauravs19.github.io/presales-playbook/', note: 'Discovery frameworks and solutioning patterns' },
    { label: 'The Presales Collective', url: 'https://www.presalescollective.com/', note: 'Community, mentorship and playbooks' },
    { label: 'MEDDIC explained', url: 'https://www.meddicc.com/', note: 'Qualification framework reference' }
  ]
},

/* ------------------------------ M11 ------------------------------ */
{
  id: 'm11', num: '11',
  title: 'Tenders, RFPs &amp; Presentations',
  tagline: 'Turn documents into signed deals',
  week: 'Week 11 · ~5 hrs', icon: '📄', color: '#2dd4bf',
  objectives: [
    'Navigate an RFP from reading to submission',
    'Write compliant, persuasive technical responses',
    'Master the compliance matrix — must vs should',
    'Present architecture to evaluation committees'
  ],
  lessons: [
    {
      title: 'RFP anatomy',
      body: `<ul>
        <li><b>Instructions</b> — format, deadline, submission portal (violate = disqualified)</li>
        <li><b>Scope of work</b> — what they actually want to buy</li>
        <li><b>Compliance matrix</b> — requirements to answer line by line</li>
        <li><b>Evaluation criteria</b> — how they score (price weight vs technical weight)</li>
        <li><b>Terms &amp; conditions</b> — review with commercial, not alone</li>
      </ul>
      <p>First read: skim everything, then read the evaluation criteria <b>twice</b> — it tells you where to spend your effort.</p>`
    },
    {
      title: 'Must vs should — the compliance discipline',
      body: `<ul>
        <li><b>"Must"</b> = pass/fail gates. Miss one → disqualified. Answer explicitly: "Compliant — see §X"</li>
        <li><b>"Should"</b> = scored points. Answer with evidence, not promises</li>
        <li>Never say "will comply" when you cannot deliver — delivery teams will read your words</li>
        <li>If a requirement genuinely doesn't fit, raise a clarification question <b>before</b> the deadline — that's what Q&amp;A rounds are for</li>
      </ul>
      <p>Interview line: <i>"I treat the compliance matrix as a contract, not a survey."</i></p>`
    },
    {
      title: 'Technical writeups that win',
      body: `<p>Reviewers skim. Structure for skimmers:</p>
      <ul>
        <li>1. Understanding of the problem (echo their words)</li>
        <li>2. Solution overview — one page, one diagram</li>
        <li>3. Architecture &amp; sizing — tables, not walls of text</li>
        <li>4. Implementation plan &amp; timeline</li>
        <li>5. Support, training, SLAs</li>
      </ul>
      <p>Rules: plain language, diagrams everywhere, tables for numbers, and <b>answer the question asked</b> — fluff is scored as "not compliant".</p>`
    },
    {
      title: 'The compliance matrix',
      body: `<p>One row per requirement:</p>
      <ul>
        <li>Requirement (verbatim)</li>
        <li>Your response — "Compliant / Partially compliant / By exception" + explanation</li>
        <li>Reference — section or appendix proving it</li>
      </ul>
      <p>Process matters: version control, one owner per answer, a final review pass against the original RFP. In big tenders, a spreadsheet tracks every row to submission.</p>`
    },
    {
      title: 'Presenting to evaluation committees',
      body: `<p>The room is mixed: <b>technical, procurement, business</b>. Strategy:</p>
      <ul>
        <li>Open with the business outcome; earn the right to go deep</li>
        <li>Pre-empt objections: cost, security, skills, migration</li>
        <li>Bring <b>evidence</b>: benchmarks, reference customers, eval numbers, a live demo</li>
        <li>Never bad-mouth competitors — position on your measurable outcomes and lower risk</li>
        <li>Close with the implementation plan, not a thank-you slide</li>
      </ul>`
    },
    {
      title: 'Win/loss reviews &amp; continuous improvement',
      body: `<ul>
        <li>After every tender: what did we win/lose and why? Be brutal and honest</li>
        <li>Update your templates, compliance library and demo kits with lessons</li>
        <li>Track: bid/no-bid decisions (don't bid on everything)</li>
      </ul>
      <p>Fresher edge: show interviewers you have a process for learning from losses. It signals coachability and maturity.</p>`
    }
  ],
  terms: [
    { term: 'RFP / RFI / RFQ', def: 'Formal buying documents: Proposal / Information / Quotation.' },
    { term: 'Compliance matrix', def: 'Line-by-line requirements with compliant responses + evidence.' },
    { term: 'Must / Should', def: 'Pass-fail gates vs scored points. Must ≠ optional.' },
    { term: 'Evaluation criteria', def: 'How bids are scored — read twice, then write.' },
    { term: 'Clarification round', def: 'The Q&amp;A window — use it before the deadline.' },
    { term: 'Win/loss review', def: 'Post-mortem that improves the next bid.' }
  ],
  quiz: [
    { q: 'A "must" requirement in an RFP is best treated as:',
      options: ['A suggestion', 'A pass/fail gate — miss it and you are disqualified', 'Optional scoring points', 'Something to negotiate later'],
      correct: 1, explain: '"Must" = mandatory. Explicit compliance answers or you are out.' },
    { q: 'Best practice for a compliance matrix row:',
      options: ['A single "yes we can do it" with no detail', 'Requirement + compliant/partial/by-exception + evidence reference', 'A marketing paragraph', 'Leave it blank if unsure'],
      correct: 1, explain: 'Every row: exact requirement, your position, proof.' },
    { q: 'An evaluation committee typically includes:',
      options: ['Only procurement', 'Technical, procurement and business stakeholders', 'Only the CIO', 'External auditors only'],
      correct: 1, explain: 'Mixed audience → tailor the story to each in the room.' },
    { q: 'You find a requirement your product cannot meet. Best move:',
      options: ['Hide it and hope', 'Claim compliance anyway', 'Raise a clarification question before the deadline, or respond "by exception" with rationale', 'Drop out immediately'],
      correct: 2, explain: 'Use the Q&amp;A round or an explicit "by exception" response — silence is disqualifying.' }
  ],
  activity: {
    title: 'Write a mini RFP response',
    goal: 'A portfolio artifact: proof you can do tender work.',
    steps: [
      'Write 10 realistic RFP requirements for an enterprise RAG platform (mix of must/should)',
      'Produce a compliance matrix with compliant responses + references for all 10',
      'Outline a 20-minute committee presentation: agenda + one diagram + 3 objection pre-empts',
      'Write a 5-sentence "understanding of the problem" section that mirrors a customer\u2019s words'
    ]
  },
  resources: [
    { label: 'Sample RFP templates', url: 'https://www.proposify.com/blog/request-for-proposal-template', note: 'Realistic RFP structures to practice on' },
    { label: 'Proposal writing best practices', url: 'https://www.apmp.org/', note: 'Association of Proposal Management Professionals' },
    { label: 'The Presales Collective', url: 'https://www.presalescollective.com/', note: 'Tender war stories and playbooks' }
  ]
},

/* ------------------------------ M12 ------------------------------ */
{
  id: 'm12', num: '12',
  title: 'Differentiators &amp; Career Launch',
  tagline: 'The "added advantage" skills + getting hired',
  week: 'Week 12 · ~6 hrs', icon: '🚀', color: '#c084fc',
  objectives: [
    'Speak AI orchestration tools: vLLM, Triton, Ray, KServe',
    'Understand multi-tenant GPU environments (JD bonus skill)',
    'Know vision/robotics AI at a conversation level',
    'Build a presales portfolio and pass the interview (Module below)'
  ],
  lessons: [
    {
      title: 'AI orchestration tools — name them correctly',
      body: `<ul>
        <li><b>vLLM</b> — high-throughput open-source LLM server (PagedAttention, continuous batching)</li>
        <li><b>TensorRT-LLM</b> — NVIDIA's compiled engine: peak performance, needs compile step</li>
        <li><b>Triton</b> — orchestration layer wrapping any backend, multi-model, metrics</li>
        <li><b>TGI</b> — Hugging Face's production server</li>
        <li><b>Ray</b> — distributed Python runtime for training and serving at scale</li>
        <li><b>KServe</b> — Kubernetes-native inference serving</li>
        <li>Frameworks: <b>LangChain / LlamaIndex</b> for orchestration of RAG and agents</li>
      </ul>
      <p>Match the tool to the job: engine (vLLM/TRT-LLM) + orchestration (Triton/KServe) + framework (LangChain).</p>`
    },
    {
      title: 'Multi-tenant GPU environments',
      body: `<p>The JD's explicit "added advantage". Speak to all four layers:</p>
      <ul>
        <li><b>Hardware slicing</b> — MIG partitions; time-slicing for elasticity</li>
        <li><b>Orchestration</b> — Kubernetes namespaces, ResourceQuotas, priority classes</li>
        <li><b>Isolation</b> — tenant data separation, network policies, per-tenant models</li>
        <li><b>Economics</b> — utilization dashboards, chargeback/showback, fairness</li>
      </ul>
      <p>Story to tell: "one H100 pod serving four teams at 90% utilization vs four idle GPU servers at 15%."</p>`
    },
    {
      title: 'Robotics &amp; vision AI (conversation level)',
      body: `<ul>
        <li><b>Edge inference</b> — small models (YOLO object detection, pose estimation) running on cameras/GPUs at the edge</li>
        <li><b>VLM on edge</b> — vision-language models for inspection, OCR in the field</li>
        <li><b>Pipeline</b> — camera → edge GPU → inference → action (quality control, safety, AGV robots)</li>
        <li>Deployment: NVIDIA Jetson / IGX for edge; Jetson + TensorRT for real-time</li>
      </ul>
      <p>One line in an interview — "I understand vision workloads need edge inference because cameras produce too much data to ship to a cloud" — already separates you.</p>`
    },
    {
      title: 'The vendor ecosystem map',
      body: `<ul>
        <li><b>Chip/GPU</b> — NVIDIA (dominant), AMD, Intel Gaudi, cloud TPUs</li>
        <li><b>Server OEMs</b> — Dell, HPE, Lenovo, Supermicro, Foxconn/Ingrasys</li>
        <li><b>Platform</b> — Red Hat (OpenShift AI), VMware/Broadcom, Canonical, Kubernetes distros</li>
        <li><b>Clouds</b> — AWS (Trainium/Inferentia), Azure (Maia), GCP (TPU), plus GPU clouds</li>
        <li>Every deal has a cast: vendor + OEM + partner + customer. Presales sits at the intersection.</li>
      </ul>
      <p>Know who partners with whom — "NVIDIA + HPE + Red Hat reference architecture" is a sentence that lands.</p>`
    },
    {
      title: 'Certifications &amp; learning roadmap',
      body: `<ul>
        <li><b>NVIDIA</b> — DLI courses (free), NVIDIA-Certified Associate (NCA) for AI infrastructure</li>
        <li><b>Kubernetes</b> — CKA (KodeKloud path) if you want the serious cred</li>
        <li><b>Cloud</b> — AWS/Azure/GCP AI/ML certs as a backup lane</li>
        <li><b>Hugging Face</b> — free course certificates (LLM, agents)</li>
        <li>Presales communities — Presales Collective for mentorship</li>
      </ul>
      <p>Rule: 30–60 min/day, portfolio over certificates, but certificates open recruiter filters.</p>`
    },
    {
      title: 'Build your portfolio',
      body: `<p>You are the product you're selling. Assemble:</p>
      <ul>
        <li>One <b>architecture diagram</b> you drew and can explain for 10 minutes</li>
        <li>A 3-minute <b>demo video</b> (record your screen; free tools)</li>
        <li>One <b>sample RFP response</b> + compliance matrix (Module 11)</li>
        <li>A <b>sizing spreadsheet</b> (Module 9 math)</li>
        <li>GitHub: 1–2 small projects (a RAG demo, a Dockerfile, a benchmark script)</li>
      </ul>
      <p>In interviews: "Here's how I'd approach your architecture" + show the work. Show, don't tell.</p>`
    },
    {
      title: 'Interview playbook',
      body: `<p>Expect these categories (then practice below in the Mock Interview):</p>
      <ul>
        <li><b>Story</b> — tell me about yourself (presales-shaped, 90 seconds)</li>
        <li><b>Technical</b> — explain RAG / fine-tune vs RAG / GPU math / K8s</li>
        <li><b>Scenario</b> — size this workload; design for this customer</li>
        <li><b>Objection</b> — "your competitor is cheaper", "we'll build in-house"</li>
        <li><b>Behavioral (STAR)</b> — a demo that failed, a skeptic you convinced, a tight deadline</li>
      </ul>
      <p>Golden rule: <b>structure every answer</b> (framework → logic → example). Rambling is the #1 rejection reason.</p>`
    }
  ],
  terms: [
    { term: 'vLLM', def: 'High-throughput open-source LLM serving engine.' },
    { term: 'Ray', def: 'Distributed Python runtime for training and serving.' },
    { term: 'KServe', def: 'Kubernetes-native model serving layer.' },
    { term: 'MIG / vGPU', def: 'Hardware GPU slicing vs virtual GPU sharing.' },
    { term: 'Edge inference', def: 'Running small models near cameras/devices — low latency, offline.' },
    { term: 'STAR', def: 'Situation, Task, Action, Result — behavioral answer structure.' }
  ],
  quiz: [
    { q: 'vLLM is best described as:',
      options: ['A vector database', 'A high-throughput LLM inference server (PagedAttention + continuous batching)', 'A data pipeline tool', 'A GPU'],
      correct: 1, explain: 'vLLM is the serving engine; its innovations target KV-cache memory and batching.' },
    { q: 'A customer wants to sell GPU capacity to 4 internal teams. The essential design topics are:',
      options: ['Only pricing', 'Isolation (MIG/vGPU), quotas/fairness, chargeback and utilization', 'More GPUs, nothing else', 'Better cooling'],
      correct: 1, explain: 'Multi-tenant GPU = isolation + orchestration + economics.' },
    { q: 'Vision workloads often require edge inference because:',
      options: ['Edge GPUs are faster than datacenter GPUs', 'Cameras generate too much data to ship to a cloud cheaply', 'Cloud models are illegal', 'Cameras have GPUs built in'],
      correct: 1, explain: 'Bandwidth and latency drive inference to the edge in vision systems.' },
    { q: 'The golden rule of interview answers is:',
      options: ['Speak as fast as possible', 'Structure every answer: framework → logic → example', 'Never say "I don\u2019t know"', 'Memorize spec sheets verbatim'],
      correct: 1, explain: 'Structure + honesty beats memorization. "I don\u2019t know, here\u2019s how I\u2019d find out" is a feature.' }
  ],
  activity: {
    title: 'Launch week — portfolio sprint',
    goal: 'Hire-ready in 7 days.',
    steps: [
      'Day 1–2: draw + record your architecture diagram and 3-min demo video',
      'Day 3: write your sample RFP response with compliance matrix',
      'Day 4: build the sizing spreadsheet and add one GitHub project',
      'Day 5–7: run 3 mock interviews using the Mock Interview below; record and re-answer each'
    ]
  },
  resources: [
    { label: 'NVIDIA certification', url: 'https://www.nvidia.com/en-us/training/certification/', note: 'NCA / infrastructure certs' },
    { label: 'Hugging Face Agents course', url: 'https://huggingface.co/learn/agents-course/en/unit0/introduction', note: 'Agents + tool orchestration' },
    { label: 'The Presales Collective', url: 'https://www.presalescollective.com/', note: 'Mentorship and job board' }
  ]
}
];
