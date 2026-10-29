// src/data/programsData.js
// Curated Python Programming Interview Questions with multi-approach solutions,
// complexity analysis, and edge case defense.

export const programsData = [
  {
    id: 'top-two-max',
    title: 'Find Top Two Maximum Numbers in Array',
    category: 'Array / Sorting / Greedy',
    difficulty: 'Easy / Foundational',
    sourceUrl: 'https://quescol.com/interview-preparation/top-two-maximum-number-in-array-python',
    sourceLabel: 'Quescol Interview Prep: Top Two Maximum Number in Array',
    summary:
      'Given an array of integers, identify and return the two largest distinct numbers. Common interview requirement: handle duplicates correctly so that repeated top values do not occupy both the 1st and 2nd spots.',
    keyTakeaway:
      'Sorting achieves O(n log n) with simple code, while a single-pass linear scan achieves optimal O(n) time and O(1) space.',
    approaches: [
      {
        id: 'sorting-set',
        name: 'Approach 1: Set Deduplication + Ascending Sort',
        filename: 'top_two_max_sort.py',
        complexity: {
          time: 'O(n log n)',
          space: 'O(n)',
          timeExplanation: 'Converting to set takes O(n), sorting k unique elements takes O(k log k) where k <= n.',
          spaceExplanation: 'O(n) auxiliary memory to store unique elements in set and sorted list.',
        },
        description:
          'Classic Quescol implementation: Removes duplicates by casting to a set, sorts in ascending order with Python Timsort, and extracts the last two elements.',
        code: `# ==============================================================================
# APPROACH 1: DEDUPLICATION & SORTING (QUESCOL CANONICAL)
# Time Complexity: O(n log n) | Auxiliary Space: O(n)
# ==============================================================================

def find_top_two_sorted():
    # 1. Take dynamic input for array size
    size = int(input("Enter size of array: "))
    arr = []
    
    # 2. Ingest elements into array
    for i in range(size):
        val = int(input(f"Enter element {i + 1} of array: "))
        arr.append(val)
        
    # 3. Strip duplicates with set() and sort ascending
    unique_sorted = sorted(set(arr))
    
    # 4. Guard against arrays without at least two distinct elements
    if len(unique_sorted) < 2:
        print("Error: Need at least 2 distinct elements to find top two maximums.")
        return None
        
    # 5. Extract top two elements from end of sorted list
    max1 = unique_sorted[-1]  # Highest maximum
    max2 = unique_sorted[-2]  # Second highest maximum
    
    print(f"Original Array: {arr}")
    print(f"The top two maximum numbers are: {max1} and {max2}")
    return max1, max2

if __name__ == "__main__":
    find_top_two_sorted()`,
        terminal: {
          command: 'python top_two_max_sort.py',
          inputs: [
            'Enter size of array: 6',
            'Enter element 1 of array: 12',
            'Enter element 2 of array: 45',
            'Enter element 3 of array: 2',
            'Enter element 4 of array: 45',
            'Enter element 5 of array: 34',
            'Enter element 6 of array: 8',
          ],
          output: [
            'Original Array: [12, 45, 2, 45, 34, 8]',
            'The top two maximum numbers are: 45 and 34',
          ],
        },
      },
      {
        id: 'linear-scan',
        name: 'Approach 2: Optimal Single-Pass Linear Scan (O(n))',
        filename: 'top_two_max_optimal.py',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'Exactly one loop iteration per element; no sorting or hashing required.',
          spaceExplanation: 'Only two scalar tracking variables (first, second), zero extra memory.',
        },
        description:
          'Optimal production & interview solution: Tracks first and second maximums in a single pass while ignoring duplicates of the maximum.',
        code: `# ==============================================================================
# APPROACH 2: OPTIMAL SINGLE-PASS LINEAR SCAN
# Time Complexity: O(n) | Auxiliary Space: O(1)
# ==============================================================================

def find_top_two_linear(arr):
    """
    Finds the top two distinct maximum numbers in O(n) time and O(1) space.
    Handles negative numbers, positive numbers, and repeated duplicates.
    """
    if len(arr) < 2:
        return "Array must have at least two elements."
        
    # Initialize with negative infinity to support negative numbers
    first = float('-inf')
    second = float('-inf')
    
    for num in arr:
        if num > first:
            # Shift old first to second, update first
            second = first
            first = num
        elif num > second and num != first:
            # Update second if distinct from first
            second = num
            
    # Check if a distinct second maximum exists
    if second == float('-inf'):
        return "No distinct second maximum found (all elements are equal)."
        
    return first, second

# Test driver
if __name__ == "__main__":
    test_cases = [
        [12, 45, 2, 45, 34, 8],
        [-10, -5, -20, -1, -50],
        [100, 100, 100],
        [42, 99],
    ]
    for case in test_cases:
        res = find_top_two_linear(case)
        print(f"Input: {case} => Top Two: {res}")`,
        terminal: {
          command: 'python top_two_max_optimal.py',
          inputs: [],
          output: [
            'Input: [12, 45, 2, 45, 34, 8] => Top Two: (45, 34)',
            'Input: [-10, -5, -20, -1, -50] => Top Two: (-1, -5)',
            'Input: [100, 100, 100] => Top Two: No distinct second maximum found (all elements are equal).',
            'Input: [42, 99] => Top Two: (99, 42)',
          ],
        },
      },
      {
        id: 'heap-topk',
        name: 'Approach 3: Min-Heap Extension for Top-K',
        filename: 'top_k_heap.py',
        complexity: {
          time: 'O(n log k)',
          space: 'O(k)',
          timeExplanation: 'Maintains a min-heap of size k=2. Each insertion takes O(log k).',
          spaceExplanation: 'Heap stores exactly k distinct items.',
        },
        description:
          'Scales gracefully when the interviewer asks: "What if you need top-10 or top-k numbers instead of just top-2?"',
        code: `# ==============================================================================
# APPROACH 3: MIN-HEAP FOR TOP-K ELEMENTS
# Generalizes to arbitrary k in O(n log k) time and O(k) space
# ==============================================================================
import heapq

def find_top_k_distinct(arr, k=2):
    """Maintains a min-heap of k unique largest elements."""
    unique_items = set(arr)
    if len(unique_items) < k:
        return f"Need at least {k} distinct elements."
        
    min_heap = []
    for num in unique_items:
        if len(min_heap) < k:
            heapq.heappush(min_heap, num)
        elif num > min_heap[0]:
            heapq.heapreplace(min_heap, num)
            
    # Sorted descending: [highest, second_highest]
    return sorted(min_heap, reverse=True)

if __name__ == "__main__":
    nums = [7, 3, 9, 2, 9, 8, 1, 10, 8]
    print("Top 2:", find_top_k_distinct(nums, k=2))
    print("Top 3:", find_top_k_distinct(nums, k=3))`,
        terminal: {
          command: 'python top_k_heap.py',
          inputs: [],
          output: [
            'Top 2: [10, 9]',
            'Top 3: [10, 9, 8]',
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: 'All Elements Identical',
        example: '[5, 5, 5, 5]',
        handling: 'Set deduplication leaves only 1 element. Return explicit warning that no distinct 2nd maximum exists.',
      },
      {
        scenario: 'Array with Negative Numbers',
        example: '[-20, -5, -1, -50]',
        handling: 'Must initialize trackers with float("-inf"), NOT 0! Otherwise negative values will never register.',
      },
      {
        scenario: 'Array Size Smaller than 2',
        example: '[42]',
        handling: 'Guard clause upfront checks len(arr) < 2 and raises ValueError or returns informative message.',
      },
      {
        scenario: 'Duplicates of Maximum Element',
        example: '[10, 20, 20, 15]',
        handling: 'Condition `num != first` ensures that the second 20 does not overwrite second maximum, keeping it at 15.',
      },
    ],
  },
  {
    id: 'reverse-array',
    title: 'Print Array in Reverse Order',
    category: 'Array / Two-Pointer / Iteration',
    difficulty: 'Easy / Foundational',
    sourceUrl: 'https://quescol.com/interview-preparation/reverse-array-python-while-loop',
    sourceLabel: 'Quescol Interview Prep: Reverse Array Python While Loop',
    summary:
      'Given an array of integers, output the elements in reverse order. Commonly used by interviewers to test pointer manipulation, loop boundaries, and in-place memory optimization.',
    keyTakeaway:
      'The while loop builds intuitive index control. In-place two-pointer reversal is the gold standard for zero extra memory allocations.',
    approaches: [
      {
        id: 'while-loop',
        name: 'Approach 1: While Loop Decrement (Quescol Canonical)',
        filename: 'reverse_array_while.py',
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          timeExplanation: 'Single while loop traversing from index size-1 down to 0.',
          spaceExplanation: 'Constructs a new list revArr to hold reversed elements.',
        },
        description:
          'Classic Quescol implementation: Initializes lastIndex at size - 1 and decrements down to 0 inside a while loop, appending elements to a new array.',
        code: `# ==============================================================================
# APPROACH 1: WHILE LOOP DECREMENT (QUESCOL CANONICAL)
# Time Complexity: O(n) | Auxiliary Space: O(n)
# ==============================================================================

def reverse_array_while():
    # 1. Take input for array size
    size = int(input("Enter the number of elements you want in array: "))
    
    # 2. Allocate storage for original and reversed arrays
    arr = []
    revArr = []
    
    # 3. Ingest elements
    for i in range(0, size):
        elem = int(input(f"Please give value for index {i}: "))
        arr.append(elem)
        
    # 4. Set pointers
    startIndex = 0
    lastIndex = size - 1
    
    # 5. Iterate while loop until lastIndex falls below 0
    while lastIndex >= 0:
        revArr.append(arr[lastIndex])
        startIndex += 1
        lastIndex -= 1
        
    # 6. Print reversed elements space-separated
    print("\\nOriginal array:", arr)
    print("Array in reverse order:")
    for i in range(0, size):
        print(revArr[i], end=" ")
    print()  # newline

if __name__ == "__main__":
    reverse_array_while()`,
        terminal: {
          command: 'python reverse_array_while.py',
          inputs: [
            'Enter the number of elements you want in array: 5',
            'Please give value for index 0: 4',
            'Please give value for index 1: 6',
            'Please give value for index 2: 4',
            'Please give value for index 3: 7',
            'Please give value for index 4: 4',
          ],
          output: [
            'Original array: [4, 6, 4, 7, 4]',
            'Array in reverse order:',
            '4 7 4 6 4',
          ],
        },
      },
      {
        id: 'two-pointer-inplace',
        name: 'Approach 2: In-Place Two-Pointer Swap (O(1) Memory)',
        filename: 'reverse_two_pointer_inplace.py',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'Performs n // 2 swaps; runs in exactly O(n/2) = O(n) iterations.',
          spaceExplanation: 'Zero new lists allocated; modifies elements in-place.',
        },
        description:
          'Optimal memory interview solution: Swaps elements at left and right pointers moving towards the center, requiring zero auxiliary memory.',
        code: `# ==============================================================================
# APPROACH 2: OPTIMAL IN-PLACE TWO-POINTER SWAP
# Time Complexity: O(n) | Auxiliary Space: O(1)
# ==============================================================================

def reverse_inplace(arr):
    """
    Reverses an array in-place using two converging pointers.
    Does NOT allocate any new list; ideal for memory-constrained systems.
    """
    left = 0
    right = len(arr) - 1
    
    # Move pointers toward each other until they meet in the middle
    while left < right:
        # Simultaneous tuple unpacking swap in Python
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
        
    return arr

if __name__ == "__main__":
    sample = [10, 20, 30, 40, 50]
    print("Before:", sample)
    reverse_inplace(sample)
    print("After in-place reverse:", sample)
    
    # Works for both even and odd length lists
    even_sample = [1, 2, 3, 4]
    print("\\nBefore (even):", even_sample)
    reverse_inplace(even_sample)
    print("After (even):", even_sample)`,
        terminal: {
          command: 'python reverse_two_pointer_inplace.py',
          inputs: [],
          output: [
            'Before: [10, 20, 30, 40, 50]',
            'After in-place reverse: [50, 40, 30, 20, 10]',
            '',
            'Before (even): [1, 2, 3, 4]',
            'After (even): [4, 3, 2, 1]',
          ],
        },
      },
      {
        id: 'pythonic-slicing',
        name: 'Approach 3: Pythonic Slicing & Built-in Iterator',
        filename: 'reverse_pythonic.py',
        complexity: {
          time: 'O(n)',
          space: 'O(1) with reversed() / O(n) with slice',
          timeExplanation: 'C-level memory copying for slice [::-1]; lazy pointer iteration for reversed().',
          spaceExplanation: 'reversed() returns an iterator without copying list.',
        },
        description:
          'Idiomatic Python: Explains the internal mechanics of step slice `arr[::-1]` and the memory-saving generator `reversed(arr)`.',
        code: `# ==============================================================================
# APPROACH 3: PYTHONIC SLICING & LAZY ITERATOR
# ==============================================================================

arr = [5, 10, 15, 20, 25]

# Method A: Extended slice syntax [start:stop:step]
# Step -1 traverses backwards; implemented in CPython C code (fastest)
reversed_slice = arr[::-1]
print("Slice [::-1]:", reversed_slice)

# Method B: reversed() generator (O(1) auxiliary memory!)
# Yields items on demand from the back without copying the list
print("reversed() iterator:", list(reversed(arr)))

# Method C: In-place method arr.reverse()
arr.reverse()
print("arr.reverse() in-place:", arr)`,
        terminal: {
          command: 'python reverse_pythonic.py',
          inputs: [],
          output: [
            'Slice [::-1]: [25, 20, 15, 10, 5]',
            'reversed() iterator: [25, 20, 15, 10, 5]',
            'arr.reverse() in-place: [25, 20, 15, 10, 5]',
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: 'Single Element Array',
        example: '[99]',
        handling: 'left = 0, right = 0. The while condition `left < right` evaluates to False immediately; returns array unchanged.',
      },
      {
        scenario: 'Empty Array',
        example: '[]',
        handling: 'lastIndex = -1. Loop never triggers; gracefully prints empty reversed list without IndexError.',
      },
      {
        scenario: 'Even vs Odd Lengths',
        example: '[1, 2, 3, 4] vs [1, 2, 3]',
        handling: 'For odd length, middle element stays untouched when left == right. For even length, pointers cross cleanly.',
      },
      {
        scenario: 'Massive Data (Millions of Elements)',
        example: 'Array of size 10^7',
        handling: 'Do NOT create revArr copy (avoids doubling memory usage). Use in-place two-pointer or `reversed()` lazy generator.',
      },
    ],
  },
  {
    id: 'first-non-repeating-char',
    title: 'First Non-Repeating Character in a String',
    category: 'String / Hash Map / Frequency Count',
    difficulty: 'Easy / Foundational',
    sourceUrl: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
    sourceLabel: 'LeetCode 387 / Interview Classic: First Unique Character in String',
    summary:
      'Given a string (e.g., "aabbcdde"), find and return the first non-repeating character (in this case, "c"). Canonical software engineering and data science interview problem requiring optimal O(n) linear runtime and O(1) auxiliary space without quadratic nested scanning.',
    keyTakeaway:
      'A naive nested search using s.count() inside a loop runs in O(n²) quadratic time. In contrast, a two-pass frequency count (via collections.Counter or an insertion-ordered dict) achieves optimal O(n) time and O(1) auxiliary space bounded by the finite alphabet size (<= 256 for ASCII).',
    approaches: [
      {
        id: 'two-pass-counter',
        name: 'Approach 1: Optimal Two-Pass Hash Map (collections.Counter)',
        filename: 'first_unique_char_counter.py',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'Pass 1 builds frequency counts in O(n); Pass 2 identifies the first character with count == 1 in O(n). Total runtime = O(2n) = O(n).',
          spaceExplanation: 'Auxiliary space is bounded by the alphabet size (at most 26 lowercase English letters or 256 ASCII), which is strictly O(1) constant memory.',
        },
        description:
          'Canonical optimal interview solution: Uses Python’s `collections.Counter` to construct a frequency map in Pass 1, then iterates sequentially through the original string in Pass 2 to return the first character with a count of 1.',
        code: `# ==============================================================================
# APPROACH 1: OPTIMAL TWO-PASS FREQUENCY MAP (COLLECTIONS.COUNTER)
# Time Complexity: O(n) | Auxiliary Space: O(1) bounded by alphabet (<= 256)
# ==============================================================================
from collections import Counter
from typing import Optional

def first_non_repeating_char(s: str) -> Optional[str]:
    """
    Finds the first character in string 's' that does not repeat.
    
    Time Complexity:  O(n) - Two linear passes over length n
    Space Complexity: O(1) - Hash map bounded by character set size (<= 256)
    """
    if not s:
        return None
        
    # Pass 1: Build frequency table in O(n)
    char_counts = Counter(s)
    
    # Pass 2: Identify the first character with frequency == 1 in original order
    for char in s:
        if char_counts[char] == 1:
            return char
            
    return None  # All characters repeat

if __name__ == "__main__":
    test_cases = [
        ("aabbcdde", "c"),
        ("loveleetcode", "v"),
        ("aabb", None),
        ("z", "z"),
        ("", None),
    ]
    
    for string_input, expected in test_cases:
        result = first_non_repeating_char(string_input)
        status = "PASSED" if result == expected else "FAILED"
        print(f"Input: '{string_input}' -> First unique: {result!r} ({status})")`,
        terminal: {
          command: 'python first_unique_char_counter.py',
          inputs: [],
          output: [
            "Input: 'aabbcdde' -> First unique: 'c' (PASSED)",
            "Input: 'loveleetcode' -> First unique: 'v' (PASSED)",
            "Input: 'aabb' -> First unique: None (PASSED)",
            "Input: 'z' -> First unique: 'z' (PASSED)",
            "Input: '' -> First unique: None (PASSED)",
          ],
        },
      },
      {
        id: 'ordered-dict',
        name: 'Approach 2: Single-Pass String Ingestion + Ordered Dict Scan',
        filename: 'first_unique_char_dict.py',
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          timeExplanation: 'Pass 1 scans string and populates dict in O(n). Pass 2 scans at most 26/256 unique keys in the dict (O(1)).',
          spaceExplanation: 'Dictionary holds at most unique characters (bounded alphabet <= 256).',
        },
        description:
          'Single pass over the input string: Builds a frequency dictionary. Since Python 3.7+, standard dict preserves insertion order, so Pass 2 only iterates over unique keys rather than re-scanning the string!',
        code: `# ==============================================================================
# APPROACH 2: SINGLE PASS OVER STRING + ORDERED DICT KEY SCAN
# Time Complexity: O(n) | Auxiliary Space: O(1)
# ==============================================================================
from typing import Optional

def first_non_repeating_dict(s: str) -> Optional[str]:
    """
    Ingests string once into Python's insertion-ordered dictionary.
    Second iteration only inspects unique keys (at most 26 in English).
    """
    if not s:
        return None
        
    counts = {}
    # Pass 1: Count frequencies while preserving first-seen insertion order
    for char in s:
        counts[char] = counts.get(char, 0) + 1
        
    # Pass 2: Iterate over unique keys (at most 26 iterations, independent of n)
    for char, count in counts.items():
        if count == 1:
            return char
            
    return None

if __name__ == "__main__":
    sample = "swiss"
    print(f"Input: '{sample}'")
    unique_char = first_non_repeating_dict(sample)
    print(f"First non-repeating character: {unique_char!r}")`,
        terminal: {
          command: 'python first_unique_char_dict.py',
          inputs: [],
          output: [
            "Input: 'swiss'",
            "First non-repeating character: 'w'",
          ],
        },
      },
      {
        id: 'brute-force',
        name: 'Approach 3: Brute Force Nested Loop / s.count() (What to Avoid)',
        filename: 'first_unique_char_bruteforce.py',
        complexity: {
          time: 'O(n²)',
          space: 'O(1)',
          timeExplanation: 'For each of the n characters, scans the entire string again: n × n = n² operations.',
          spaceExplanation: 'Zero extra memory structures allocated.',
        },
        description:
          'Naive baseline: Explains why interviewers penalize quadratic solutions. Using `s.count(char)` inside a loop or nested loops creates an O(n²) quadratic bottleneck that times out on large inputs.',
        code: `# ==============================================================================
# APPROACH 3: BRUTE FORCE / S.COUNT() (NAIVE O(n^2) COMPLEXITY - AVOID!)
# ==============================================================================

def first_non_repeating_naive(s: str):
    """
    Caution: s.count(char) internally scans the whole string of length n.
    Calling it inside a loop of length n results in O(n^2) quadratic runtime!
    """
    for char in s:
        # Pitfall: s.count() takes O(n) time for EACH iteration!
        if s.count(char) == 1:
            return char
    return None

if __name__ == "__main__":
    word = "aabbcdde"
    print("Result:", first_non_repeating_naive(word))
    print("Explanation: Fails on 100,000 character inputs due to 10^10 operations (Time Limit Exceeded).")`,
        terminal: {
          command: 'python first_unique_char_bruteforce.py',
          inputs: [],
          output: [
            'Result: c',
            'Explanation: Fails on 100,000 character inputs due to 10^10 operations (Time Limit Exceeded).',
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: 'Empty String',
        example: '""',
        handling: 'Guarded with `if not s: return None` at the start to immediately return None without unnecessary hash allocations.',
      },
      {
        scenario: 'All Characters Repeat',
        example: '"aabbcc"',
        handling: 'All frequency counts in the hash map are >= 2. The loop finishes without finding any count == 1 and cleanly returns None.',
      },
      {
        scenario: 'Single Character String',
        example: '"z"',
        handling: 'Loop iterates once; frequency is 1; immediately returns "z" in O(1) steps.',
      },
      {
        scenario: 'Case Sensitivity',
        example: '"Aa"',
        handling: 'In standard ASCII, "A" (ASCII 65) and "a" (ASCII 97) are distinct characters. Discuss with interviewer if normalization (`s.lower()`) is required.',
      },
      {
        scenario: 'Extremely Large String (10^7 characters)',
        example: 'DNA sequence or streaming logs',
        handling: 'Never use `s.count()` (O(n²)). The two-pass hash map runs in 20M operations (under 0.2s in Python) with constant memory O(1).',
      },
    ],
  },
];

