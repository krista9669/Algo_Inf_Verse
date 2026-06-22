/**
 * algo-assistant.js
 * Algorithm Decision Tree Assistant
 *
 * Architecture:
 *  - TREES   : the decision tree data for each category (plain JS objects)
 *  - RESULTS : the full algorithm result data (complexity, intuition, problems)
 *  - ENGINE  : traverses the tree, renders questions, shows results
 *
 * Adding a new algorithm: add a leaf node to a TREES entry pointing to a
 * RESULTS key, then add the result data in RESULTS. No other code changes needed.
 */

/* ════════════════════════════════════════════════════════════
   RESULT DATA
   Each key maps to a full algorithm description shown on the result card.
════════════════════════════════════════════════════════════ */
const RESULTS = {

  binary_search: {
    name: "Binary Search",
    icon: "🔍",
    time: "O(log n)",
    space: "O(1)",
    prereq: "Sorted array",
    intuition: "Imagine opening a dictionary to the exact middle page. If the word you want comes before that page alphabetically, tear out the right half and repeat — otherwise tear out the left half. Each step halves your search space, giving you a logarithmic speed that blows linear search out of the water on large datasets.",
    useWhen: [
      "Array or list is sorted (or can be sorted cheaply)",
      "You need O(log n) search speed",
      "You just need the index / existence of a target",
      "The data doesn't change frequently (static dataset)",
    ],
    avoidWhen: [
      "Data is unsorted and sorting is too expensive",
      "You need to find all occurrences, not just one",
      "Working with a linked list (no O(1) random access)",
      "Dataset is very small — linear search is fine",
    ],
    problems: [
      { title: "Binary Search",                    difficulty: "easy",   url: "index.html#practice" },
      { title: "Search in Rotated Sorted Array",   difficulty: "medium", url: "index.html#practice" },
      { title: "Find Minimum in Rotated Array",    difficulty: "medium", url: "index.html#practice" },
      { title: "First Bad Version",                difficulty: "easy",   url: "index.html#practice" },
      { title: "Koko Eating Bananas",              difficulty: "medium", url: "index.html#practice" },
    ],
  },

  linear_search: {
    name: "Linear Search",
    icon: "🔎",
    time: "O(n)",
    space: "O(1)",
    prereq: "None",
    intuition: "Walk through every element from left to right until you find what you're looking for — or confirm it isn't there. Simple, universal, and the only option when data is unsorted or you have no index structure.",
    useWhen: [
      "Array is unsorted and sorting would be wasteful",
      "Small dataset where simplicity beats performance",
      "You need to find all occurrences, not just one",
      "Searching a linked list (no random access)",
    ],
    avoidWhen: [
      "Dataset is large and sorted — use Binary Search",
      "Same search repeated many times — build an index",
      "Performance is critical in a hot loop",
    ],
    problems: [
      { title: "Find the Index of the First Occurrence", difficulty: "easy",   url: "index.html#practice" },
      { title: "Search Insert Position",                  difficulty: "easy",   url: "index.html#practice" },
      { title: "Find All Duplicates in Array",            difficulty: "medium", url: "index.html#practice" },
    ],
  },

  hash_search: {
    name: "Hash Map / Hash Set Lookup",
    icon: "🗄️",
    time: "O(1) avg",
    space: "O(n)",
    prereq: "None",
    intuition: "A hash map is like a locker room where each locker has a unique number derived from its content. You compute the 'locker number' (hash) from the key, go directly to that locker, and retrieve in constant time — no scanning needed. The price is O(n) extra memory.",
    useWhen: [
      "You need O(1) average lookup by key",
      "Checking membership / existence fast (use a Set)",
      "Counting frequencies of elements",
      "Two Sum / pair-finding problems",
    ],
    avoidWhen: [
      "Memory is extremely constrained",
      "You need keys in sorted order (use a BST/TreeMap)",
      "Hash collisions are a security concern",
    ],
    problems: [
      { title: "Two Sum",                    difficulty: "easy",   url: "index.html#practice" },
      { title: "Valid Anagram",              difficulty: "easy",   url: "index.html#practice" },
      { title: "Group Anagrams",             difficulty: "medium", url: "index.html#practice" },
      { title: "Longest Consecutive Sequence", difficulty: "medium", url: "index.html#practice" },
    ],
  },

  bfs: {
    name: "Breadth-First Search (BFS)",
    icon: "🌊",
    time: "O(V + E)",
    space: "O(V)",
    prereq: "Graph or tree; use a queue",
    intuition: "Drop a stone in water and watch the ripples spread outward ring by ring. BFS explores all nodes at distance 1 before any at distance 2, guaranteeing the shortest path (in hops) on unweighted graphs. It uses a queue — the first node discovered is the first processed.",
    useWhen: [
      "Shortest path on an unweighted graph",
      "Level-order traversal of a tree",
      "Finding all nodes within distance k",
      "Word Ladder / shortest transformation sequence",
    ],
    avoidWhen: [
      "Graph is weighted — use Dijkstra instead",
      "You need all paths, not just shortest — use DFS",
      "Memory is tight — BFS frontier can be wide",
    ],
    problems: [
      { title: "Number of Islands",          difficulty: "medium", url: "index.html#practice" },
      { title: "Word Ladder",                difficulty: "hard",   url: "index.html#practice" },
      { title: "Rotting Oranges",            difficulty: "medium", url: "index.html#practice" },
      { title: "Binary Tree Level Order",    difficulty: "medium", url: "index.html#practice" },
    ],
  },

  dijkstra: {
    name: "Dijkstra's Algorithm",
    icon: "✈️",
    time: "O((V + E) log V)",
    space: "O(V)",
    prereq: "Weighted graph with non-negative edge weights; min-heap",
    intuition: "Imagine you're finding the cheapest flight route. Dijkstra always expands the currently cheapest known destination, updating neighbours if a cheaper path through it is found. It's BFS with a priority queue instead of a plain queue — weight-aware greedy exploration.",
    useWhen: [
      "Shortest path on a weighted graph",
      "All edge weights are non-negative",
      "Single-source shortest path to all nodes",
      "Network routing, maps, flight paths",
    ],
    avoidWhen: [
      "Graph has negative edge weights — use Bellman-Ford",
      "Graph is unweighted — BFS is simpler and faster",
      "Very dense graphs — consider Bellman-Ford or Floyd-Warshall",
    ],
    problems: [
      { title: "Network Delay Time",         difficulty: "medium", url: "index.html#practice" },
      { title: "Cheapest Flights Within K Stops", difficulty: "medium", url: "index.html#practice" },
      { title: "Path With Minimum Effort",   difficulty: "medium", url: "index.html#practice" },
    ],
  },

  dfs: {
    name: "Depth-First Search (DFS)",
    icon: "🌲",
    time: "O(V + E)",
    space: "O(V)",
    prereq: "Graph or tree; use recursion or an explicit stack",
    intuition: "Think of exploring a maze by always turning left and only backtracking when you hit a dead end. DFS goes as deep as possible along one path before trying another. Great for exhaustive exploration, cycle detection, and topological ordering.",
    useWhen: [
      "Detecting cycles in a graph",
      "Topological sort (course schedule problems)",
      "Finding connected components",
      "Tree path problems (path sum, diameter)",
      "Backtracking (permutations, subsets)",
    ],
    avoidWhen: [
      "You need the shortest path — use BFS",
      "Very deep recursion risks a stack overflow — use iterative DFS",
      "Graph is huge and you just need nearest nodes — BFS is better",
    ],
    problems: [
      { title: "Course Schedule",            difficulty: "medium", url: "index.html#practice" },
      { title: "Number of Connected Components", difficulty: "medium", url: "index.html#practice" },
      { title: "Clone Graph",                difficulty: "medium", url: "index.html#practice" },
      { title: "Path Sum",                   difficulty: "easy",   url: "index.html#practice" },
    ],
  },

  bubble_sort: {
    name: "Bubble Sort",
    icon: "🫧",
    time: "O(n²)",
    space: "O(1)",
    prereq: "None",
    intuition: "Repeatedly scan the array and swap adjacent elements that are out of order. The largest unsorted element 'bubbles up' to its correct position each pass. Simple to understand and implement, but slow — only practical for very small or nearly-sorted arrays.",
    useWhen: [
      "Dataset is tiny (fewer than ~20 elements)",
      "Educational purposes / understanding sorting basics",
      "Array is nearly sorted — optimised bubble sort is O(n)",
    ],
    avoidWhen: [
      "Dataset is large — O(n²) is unacceptable",
      "Performance matters at all",
    ],
    problems: [
      { title: "Sort Colors (Dutch Flag)",   difficulty: "medium", url: "index.html#practice" },
      { title: "Move Zeroes",                difficulty: "easy",   url: "index.html#practice" },
    ],
  },

  merge_sort: {
    name: "Merge Sort",
    icon: "🔀",
    time: "O(n log n)",
    space: "O(n)",
    prereq: "None — works on any comparable data",
    intuition: "Divide the array in half recursively until you have single-element subarrays (trivially sorted), then merge pairs back together in sorted order. Guaranteed O(n log n) in all cases — stable and predictable, but needs O(n) extra memory.",
    useWhen: [
      "You need guaranteed O(n log n) worst case",
      "Sorting linked lists (no random access needed)",
      "You need a stable sort (equal elements keep original order)",
      "Counting inversions (modified merge step)",
    ],
    avoidWhen: [
      "Memory is constrained — needs O(n) extra space",
      "Average-case speed matters most — Quick Sort is faster in practice",
    ],
    problems: [
      { title: "Sort an Array",              difficulty: "medium", url: "index.html#practice" },
      { title: "Merge Sorted Array",         difficulty: "easy",   url: "index.html#practice" },
      { title: "Count of Smaller Numbers After Self", difficulty: "hard", url: "index.html#practice" },
    ],
  },

  quick_sort: {
    name: "Quick Sort",
    icon: "⚡",
    time: "O(n log n) avg · O(n²) worst",
    space: "O(log n)",
    prereq: "None — works in-place",
    intuition: "Pick a pivot element, partition the array so everything smaller is left and everything larger is right, then recursively sort both halves. Fast in practice because of great cache locality and low constant factors — most language built-in sorts use a Quick Sort variant.",
    useWhen: [
      "General-purpose sorting (average case fastest in practice)",
      "In-place sort is important (O(log n) stack space only)",
      "Data is random with no adversarial inputs",
    ],
    avoidWhen: [
      "Worst-case O(n²) is unacceptable (already-sorted input + bad pivot)",
      "You need a stable sort — Quick Sort is unstable",
      "Guaranteed performance is critical — use Merge Sort",
    ],
    problems: [
      { title: "Sort Colors",                difficulty: "medium", url: "index.html#practice" },
      { title: "Kth Largest Element",        difficulty: "medium", url: "index.html#practice" },
    ],
  },

  sliding_window: {
    name: "Sliding Window",
    icon: "🪟",
    time: "O(n)",
    space: "O(1) or O(k)",
    prereq: "Contiguous subarray/substring; array or string",
    intuition: "Instead of recomputing a subarray sum from scratch every time, maintain a 'window' of elements and just add the new right element and subtract the old left element as the window slides. Turns O(n·k) brute force into O(n) elegantly.",
    useWhen: [
      "Maximum/minimum sum subarray of fixed size k",
      "Longest substring with at most k distinct characters",
      "Minimum window substring",
      "Any 'contiguous subarray satisfying condition' problem",
    ],
    avoidWhen: [
      "Elements are not contiguous (use DP for subsequences)",
      "You need non-adjacent selections (use House Robber DP)",
    ],
    problems: [
      { title: "Maximum Average Subarray I",        difficulty: "easy",   url: "index.html#practice" },
      { title: "Longest Substring Without Repeating", difficulty: "medium", url: "index.html#practice" },
      { title: "Minimum Window Substring",           difficulty: "hard",   url: "index.html#practice" },
      { title: "Fruit Into Baskets",                 difficulty: "medium", url: "index.html#practice" },
    ],
  },

  prefix_sum: {
    name: "Prefix Sum",
    icon: "➕",
    time: "O(n) build · O(1) query",
    space: "O(n)",
    prereq: "Static array; queries for subarray sums",
    intuition: "Precompute a running total so that the sum of any subarray [i, j] is just prefix[j+1] - prefix[i]. Pay O(n) once upfront, then answer any range sum query in O(1). Essential when the same array is queried many times.",
    useWhen: [
      "Multiple subarray sum queries on the same array",
      "Finding subarrays with a given sum",
      "2D matrix region sums",
      "Difference arrays for range update problems",
    ],
    avoidWhen: [
      "Array is modified frequently — prefix sum needs rebuilding",
      "Only one query needed — just loop",
    ],
    problems: [
      { title: "Range Sum Query — Immutable",  difficulty: "easy",   url: "index.html#practice" },
      { title: "Subarray Sum Equals K",        difficulty: "medium", url: "index.html#practice" },
      { title: "Product of Array Except Self", difficulty: "medium", url: "index.html#practice" },
      { title: "Contiguous Array",             difficulty: "medium", url: "index.html#practice" },
    ],
  },

  two_pointers: {
    name: "Two Pointers",
    icon: "👉👈",
    time: "O(n)",
    space: "O(1)",
    prereq: "Often sorted array; or fast/slow pointer on linked list",
    intuition: "Place one pointer at each end (or use fast/slow) and move them toward each other based on conditions. Eliminates the need for nested loops on many pair/triplet problems, dropping O(n²) to O(n) when the data is sorted.",
    useWhen: [
      "Pair or triplet sum problems on a sorted array",
      "In-place array reversal or rearrangement",
      "Cycle detection in linked lists (fast/slow)",
      "Removing duplicates from sorted array in-place",
    ],
    avoidWhen: [
      "Array is unsorted and sorting is too costly",
      "You need all pairs, not just existence",
    ],
    problems: [
      { title: "Two Sum II (sorted input)",    difficulty: "medium", url: "index.html#practice" },
      { title: "3Sum",                         difficulty: "medium", url: "index.html#practice" },
      { title: "Container With Most Water",    difficulty: "medium", url: "index.html#practice" },
      { title: "Trapping Rain Water",          difficulty: "hard",   url: "index.html#practice" },
    ],
  },

  dp_1d: {
    name: "1D Dynamic Programming",
    icon: "🎯",
    time: "O(n)",
    space: "O(n) → often O(1) with space opt",
    prereq: "Overlapping subproblems + optimal substructure",
    intuition: "Break the problem into overlapping subproblems, store their answers in a table, and build up the final answer without recomputing. If you can express dp[i] = f(dp[i-1], dp[i-2], ...) then 1D DP applies. The classic examples: Fibonacci, Climbing Stairs, House Robber.",
    useWhen: [
      "Counting ways to reach a state",
      "Maximum/minimum over a sequence with choices",
      "Cannot pick adjacent elements",
      "Fibonacci-style recurrence",
    ],
    avoidWhen: [
      "No overlapping subproblems — greedy or divide-and-conquer is simpler",
      "The state space is too large to memoize",
    ],
    problems: [
      { title: "Climbing Stairs",             difficulty: "easy",   url: "index.html#practice" },
      { title: "House Robber",                difficulty: "medium", url: "index.html#practice" },
      { title: "Coin Change",                 difficulty: "medium", url: "index.html#practice" },
      { title: "Longest Increasing Subsequence", difficulty: "medium", url: "index.html#practice" },
    ],
  },

  dp_2d: {
    name: "2D Dynamic Programming",
    icon: "🗂️",
    time: "O(m × n)",
    space: "O(m × n) → often O(n)",
    prereq: "Two sequences or a grid; state depends on two indices",
    intuition: "When the state requires two variables (e.g. position in two strings, or row/column in a grid), extend your DP table to two dimensions. dp[i][j] typically represents the answer for the first i elements of one input and j of another.",
    useWhen: [
      "Comparing two strings (LCS, Edit Distance)",
      "Grid path problems (unique paths, min path sum)",
      "Knapsack with items and capacity",
      "Interleaving strings",
    ],
    avoidWhen: [
      "Only one sequence — 1D DP is sufficient",
      "Grid is huge — check if space can be reduced to 1D",
    ],
    problems: [
      { title: "Unique Paths",               difficulty: "medium", url: "index.html#practice" },
      { title: "Longest Common Subsequence", difficulty: "medium", url: "index.html#practice" },
      { title: "Edit Distance",              difficulty: "hard",   url: "index.html#practice" },
      { title: "Minimum Path Sum",           difficulty: "medium", url: "index.html#practice" },
    ],
  },

  fast_slow_pointer: {
    name: "Fast & Slow Pointers (Floyd's)",
    icon: "🐢🐇",
    time: "O(n)",
    space: "O(1)",
    prereq: "Linked list or array with cycle",
    intuition: "The tortoise and hare race: one pointer moves one step, the other moves two. If there's a cycle, they will inevitably meet. If not, the fast pointer hits null first. Also used to find the middle of a linked list in one pass.",
    useWhen: [
      "Detecting a cycle in a linked list",
      "Finding the start of a cycle",
      "Finding the middle node of a linked list",
      "Palindrome linked list check",
    ],
    avoidWhen: [
      "Working with arrays that can't have cycles — simpler approaches suffice",
    ],
    problems: [
      { title: "Linked List Cycle",          difficulty: "easy",   url: "index.html#practice" },
      { title: "Linked List Cycle II",       difficulty: "medium", url: "index.html#practice" },
      { title: "Middle of Linked List",      difficulty: "easy",   url: "index.html#practice" },
      { title: "Happy Number",               difficulty: "easy",   url: "index.html#practice" },
    ],
  },

  reverse_list: {
    name: "Iterative List Reversal",
    icon: "🔁",
    time: "O(n)",
    space: "O(1)",
    prereq: "Singly linked list",
    intuition: "Walk the list with three pointers: prev (starts null), curr (starts head), next (lookahead). Each step: save next, flip curr's pointer to prev, advance both. After one pass, prev is the new head. No extra memory needed.",
    useWhen: [
      "Reversing a singly linked list in-place",
      "Reversing a sublist (k-group reversal)",
      "Checking palindrome linked list",
    ],
    avoidWhen: [
      "You need the original order preserved — make a copy first",
    ],
    problems: [
      { title: "Reverse Linked List",        difficulty: "easy",   url: "index.html#practice" },
      { title: "Reverse Linked List II",     difficulty: "medium", url: "index.html#practice" },
      { title: "Reverse Nodes in k-Group",   difficulty: "hard",   url: "index.html#practice" },
      { title: "Palindrome Linked List",     difficulty: "easy",   url: "index.html#practice" },
    ],
  },

};

/* ════════════════════════════════════════════════════════════
   DECISION TREES
   Each tree is a nested object. A node has:
     question  : string shown to the user
     meta      : small label ("Question 2 of ~4" etc.)
     options   : array of { label, hint?, icon?, next }
       next    : either a string key in RESULTS (leaf) or another node object
════════════════════════════════════════════════════════════ */
const TREES = {

  searching: {
    question: "Is the data you're searching through sorted?",
    meta: "Question 1 of 3",
    options: [
      {
        label: "Yes, it's sorted",
        hint: "Elements are in ascending or descending order",
        icon: "✅",
        next: {
          question: "How often do you need to search the same dataset?",
          meta: "Question 2 of 3",
          options: [
            {
              label: "Once or a few times",
              hint: "No need for a lookup structure",
              icon: "1️⃣",
              next: {
                question: "Do you need the fastest possible search time?",
                meta: "Question 3 of 3",
                options: [
                  { label: "Yes — O(log n) please", icon: "⚡", next: "binary_search" },
                  { label: "Simple code is fine",    icon: "🙂", next: "linear_search" },
                ],
              },
            },
            {
              label: "Many times repeatedly",
              hint: "Worth building a lookup structure",
              icon: "♾️",
              next: "hash_search",
            },
          ],
        },
      },
      {
        label: "No, it's unsorted",
        hint: "Elements are in arbitrary order",
        icon: "❌",
        next: {
          question: "Will you search the same dataset many times?",
          meta: "Question 2 of 3",
          options: [
            {
              label: "Yes — many lookups needed",
              hint: "Build a hash map for O(1) lookups",
              icon: "🔄",
              next: "hash_search",
            },
            {
              label: "No — just once or twice",
              hint: "A simple scan is good enough",
              icon: "1️⃣",
              next: "linear_search",
            },
          ],
        },
      },
    ],
  },

  graph: {
    question: "What are you trying to find in the graph?",
    meta: "Question 1 of 3",
    options: [
      {
        label: "Shortest path between nodes",
        hint: "Minimum hops or minimum cost",
        icon: "🛣️",
        next: {
          question: "Do the edges have weights (costs)?",
          meta: "Question 2 of 3",
          options: [
            {
              label: "Yes — edges have different costs",
              hint: "e.g. flight prices, road distances",
              icon: "💰",
              next: {
                question: "Are all edge weights non-negative?",
                meta: "Question 3 of 3",
                options: [
                  { label: "Yes, all weights ≥ 0", icon: "✅", next: "dijkstra" },
                  { label: "Some weights are negative", icon: "⚠️", next: "dijkstra" }, // note for Bellman-Ford
                ],
              },
            },
            {
              label: "No — all edges equal / unweighted",
              hint: "e.g. social network connections",
              icon: "🔗",
              next: "bfs",
            },
          ],
        },
      },
      {
        label: "Explore / visit all reachable nodes",
        hint: "Connected components, cycle detection, ordering",
        icon: "🌐",
        next: {
          question: "Do you need level-by-level (BFS) or deep-first (DFS) exploration?",
          meta: "Question 2 of 2",
          options: [
            {
              label: "Level by level — nearest first",
              hint: "Ripple outward from source",
              icon: "🌊",
              next: "bfs",
            },
            {
              label: "Go deep — full path before backtracking",
              hint: "Cycles, topological sort, backtracking",
              icon: "🌲",
              next: "dfs",
            },
          ],
        },
      },
    ],
  },

  sorting: {
    question: "How large is your dataset?",
    meta: "Question 1 of 3",
    options: [
      {
        label: "Tiny (< ~20 elements)",
        hint: "Simplicity matters more than speed",
        icon: "🐣",
        next: "bubble_sort",
      },
      {
        label: "Medium to large",
        hint: "Performance matters",
        icon: "📦",
        next: {
          question: "Do you need a guaranteed O(n log n) worst case?",
          meta: "Question 2 of 3",
          options: [
            {
              label: "Yes — predictable performance is critical",
              hint: "e.g. real-time systems, adversarial inputs",
              icon: "🔒",
              next: "merge_sort",
            },
            {
              label: "No — fastest average case is enough",
              hint: "Typical random data",
              icon: "⚡",
              next: {
                question: "Do you need a stable sort (equal elements keep their order)?",
                meta: "Question 3 of 3",
                options: [
                  { label: "Yes — stability required", icon: "⚖️", next: "merge_sort" },
                  { label: "No — unstable is fine",    icon: "🆗", next: "quick_sort" },
                ],
              },
            },
          ],
        },
      },
    ],
  },

  subarray: {
    question: "What kind of subarray problem is it?",
    meta: "Question 1 of 2",
    options: [
      {
        label: "Sum / average over a contiguous window",
        hint: "Max sum subarray, fixed-size window",
        icon: "🪟",
        next: {
          question: "Is the window size fixed or variable?",
          meta: "Question 2 of 2",
          options: [
            { label: "Fixed size k",     hint: "Window always has exactly k elements", icon: "📏", next: "sliding_window" },
            { label: "Variable size",    hint: "Window grows/shrinks based on condition", icon: "🔄", next: "sliding_window" },
          ],
        },
      },
      {
        label: "Sum of any subarray equals a target — count or find",
        hint: "e.g. Subarray Sum Equals K",
        icon: "🎯",
        next: "prefix_sum",
      },
      {
        label: "Pair or triplet with a target sum",
        hint: "Two Sum, 3Sum",
        icon: "👫",
        next: "two_pointers",
      },
    ],
  },

  dp: {
    question: "What type of optimization problem is it?",
    meta: "Question 1 of 2",
    options: [
      {
        label: "Sequence — one array or string",
        hint: "Fibonacci, Climbing Stairs, House Robber, Coin Change",
        icon: "➡️",
        next: "dp_1d",
      },
      {
        label: "Two sequences or a grid",
        hint: "LCS, Edit Distance, Unique Paths",
        icon: "🗂️",
        next: "dp_2d",
      },
    ],
  },

  linkedlist: {
    question: "What operation do you need to perform on the linked list?",
    meta: "Question 1 of 2",
    options: [
      {
        label: "Detect or find a cycle",
        hint: "Does the list loop back on itself?",
        icon: "🔄",
        next: "fast_slow_pointer",
      },
      {
        label: "Find the middle node",
        hint: "In one pass, without knowing length",
        icon: "🎯",
        next: "fast_slow_pointer",
      },
      {
        label: "Reverse the list",
        hint: "In-place, O(1) space",
        icon: "🔁",
        next: "reverse_list",
      },
      {
        label: "Search for a value",
        hint: "Linear scan from head",
        icon: "🔍",
        next: "linear_search",
      },
    ],
  },

};

/* ════════════════════════════════════════════════════════════
   ENGINE
════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {

  // --- Element refs ---
  const categoriesEl  = document.getElementById("adtCategories");
  const questionCard  = document.getElementById("adtQuestionCard");
  const resultCard    = document.getElementById("adtResultCard");
  const questionMeta  = document.getElementById("adtQuestionMeta");
  const questionText  = document.getElementById("adtQuestionText");
  const optionsEl     = document.getElementById("adtOptions");
  const backBtn       = document.getElementById("adtBackBtn");
  const trailEl       = document.getElementById("adtTrail");
  const restartBtn    = document.getElementById("adtRestartBtn");
  const changeCatBtn  = document.getElementById("adtChangeCatBtn");

  // --- State ---
  let currentCategory = "searching";
  let nodeStack       = [];   // stack of { node, chosenIndex } for back navigation
  let currentNode     = null;
  let pathLog         = [];   // { question, answer } for the recap display

  // --- Init ---
  startCategory("searching");

  // Category picker
  categoriesEl.addEventListener("click", e => {
    const btn = e.target.closest(".adt-cat-btn");
    if (!btn) return;
    document.querySelectorAll(".adt-cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    startCategory(btn.dataset.tree);
  });

  // Back button
  backBtn.addEventListener("click", goBack);

  // Result actions
  restartBtn.addEventListener("click", () => startCategory(currentCategory));
  changeCatBtn.addEventListener("click", () => {
    window.scrollTo({ top: document.getElementById("assistant").offsetTop - 80, behavior: "smooth" });
    startCategory(currentCategory);
  });

  /* ── Core functions ────────────────────────────────────── */

  function startCategory(key) {
    currentCategory = key;
    nodeStack  = [];
    pathLog    = [];
    currentNode = TREES[key];
    showQuestion(currentNode);
    showQuestionCard();
  }

  function showQuestion(node) {
    questionMeta.textContent = node.meta || "";
    questionText.textContent = node.question;

    optionsEl.innerHTML = node.options.map((opt, i) => `
      <button class="adt-option-btn" data-index="${i}" type="button">
        <span class="adt-option-icon">${opt.icon || "◆"}</span>
        <span class="adt-option-label">
          ${opt.label}
          ${opt.hint ? `<span class="adt-option-hint">${opt.hint}</span>` : ""}
        </span>
      </button>
    `).join("");

    optionsEl.querySelectorAll(".adt-option-btn").forEach(btn => {
      btn.addEventListener("click", () => handleAnswer(parseInt(btn.dataset.index)));
    });

    // Show back button only when there's history
    if (nodeStack.length > 0) {
      backBtn.classList.add("visible");
    } else {
      backBtn.classList.remove("visible");
    }

    updateBreadcrumb();
  }

  function handleAnswer(index) {
    const opt = currentNode.options[index];

    // Log the step
    pathLog.push({ question: currentNode.question, answer: opt.label });

    // Push current node onto stack (for back navigation)
    nodeStack.push({ node: currentNode, chosenIndex: index });

    const next = opt.next;

    if (typeof next === "string") {
      // Leaf — show result
      showResult(next);
    } else {
      // Internal node — go deeper
      currentNode = next;
      showQuestion(currentNode);
      updateBreadcrumb();
    }
  }

  function goBack() {
    if (nodeStack.length === 0) return;
    pathLog.pop();
    const prev = nodeStack.pop();
    currentNode = prev.node;
    showQuestion(currentNode);
  }

  /* ── Result display ───────────────────────────────────── */

  function showResult(key) {
    const data = RESULTS[key];
    if (!data) return;

    // Header
    document.getElementById("adtResultIcon").textContent = data.icon;
    document.getElementById("adtResultName").textContent = data.name;

    // Complexity
    document.getElementById("adtTimeComp").textContent  = data.time;
    document.getElementById("adtSpaceComp").textContent = data.space;
    document.getElementById("adtPrereq").textContent    = data.prereq;

    // Intuition
    document.getElementById("adtIntuition").innerHTML = `
      <div class="adt-intuition-title">💡 The Intuition</div>
      <p>${data.intuition}</p>
    `;

    // Use / avoid
    document.getElementById("adtUseWhen").innerHTML =
      data.useWhen.map(t => `<li>${t}</li>`).join("");
    document.getElementById("adtAvoidWhen").innerHTML =
      data.avoidWhen.map(t => `<li>${t}</li>`).join("");

    // Problems
    document.getElementById("adtProblemsList").innerHTML =
      data.problems.map(p => `
        <a class="adt-problem-item" href="${p.url}">
          <span class="adt-problem-title">${p.title}</span>
          <span class="adt-problem-meta">
            <span class="adt-problem-badge adt-badge-${p.difficulty}">${p.difficulty}</span>
            <i class="fas fa-arrow-right" style="color:var(--text-secondary);font-size:0.75rem;"></i>
          </span>
        </a>
      `).join("");

    // Path recap
    const steps = [...pathLog, { question: null, answer: `→ ${data.name}` }];
    document.getElementById("adtPathSteps").innerHTML = steps.map((step, i) => {
      if (step.question === null) {
        return `<span class="adt-path-a">${step.answer}</span>`;
      }
      return `
        <span class="adt-path-q" title="${step.question}">${truncate(step.question, 32)}</span>
        <span class="adt-path-sep">→</span>
        <span class="adt-path-a">${step.answer}</span>
        <span class="adt-path-sep">·</span>
      `;
    }).join("");

    showResultCard();
  }

  /* ── Breadcrumb ───────────────────────────────────────── */

  function updateBreadcrumb() {
    if (pathLog.length === 0) {
      trailEl.innerHTML = '<span style="font-size:0.78rem;color:var(--text-secondary);">Start answering to see your path here.</span>';
      return;
    }
    trailEl.innerHTML = pathLog.map((step, i) => `
      <span class="adt-crumb">
        <span class="adt-crumb-text">${step.answer}</span>
        ${i < pathLog.length - 1 ? '<span class="adt-crumb-arrow">›</span>' : ""}
      </span>
    `).join("");
  }

  /* ── Show / hide cards ────────────────────────────────── */

  function showQuestionCard() {
    questionCard.hidden  = false;
    resultCard.hidden    = true;
    updateBreadcrumb();
  }

  function showResultCard() {
    questionCard.hidden  = true;
    resultCard.hidden    = false;
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ── Utility ──────────────────────────────────────────── */

  function truncate(str, max) {
    return str.length > max ? str.slice(0, max) + "…" : str;
  }

  /* ── Scroll-to-top button ─────────────────────────────── */
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── Newsletter form ──────────────────────────────────── */
  const form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (!input || !input.value.trim()) return;
      const btn = form.querySelector("button[type='submit']");
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      input.value = "";
      setTimeout(() => { btn.innerHTML = orig; }, 3000);
    });
  }

});