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
  {
    id: "reverse-string",
    title: "Reverse a String",
    category: "String / Slicing / Two Pointers",
    difficulty: "Easy / Foundational",
    sourceUrl: "https://leetcode.com/problems/reverse-string/",
    sourceLabel: "LeetCode 344: Reverse String",
    summary: "Given a string, return it with its characters in reverse order. The most common Python warm-up question; interviewers usually ask for a \"without slicing\" version as follow-up.",
    keyTakeaway: "Slicing s[::-1] is the Pythonic one-liner; the two-pointer swap shows you understand the algorithm behind it.",
    approaches: [
      {
        id: "slicing",
        name: "Approach 1: Slicing s[::-1] (Pythonic)",
        filename: "reverse_string_slice.py",
        complexity: {
          time: "O(n)",
          space: "O(n)",
          timeExplanation: "Slicing visits every character once.",
          spaceExplanation: "Creates a new string of length n (strings are immutable).",
        },
        description: "Uses extended slice syntax with step -1 to walk the string backwards.",
        code: `def reverse_string(s):
    return s[::-1]

if __name__ == "__main__":
    for s in ["hello", "Python", "a", ""]:
        print(f"{s!r} -> {reverse_string(s)!r}")`,
        terminal: {
          command: "python reverse_string_slice.py",
          inputs: [],
          output: [
            "'hello' -> 'olleh'",
            "'Python' -> 'nohtyP'",
            "'a' -> 'a'",
            "'' -> ''",
          ],
        },
      },
      {
        id: "loop",
        name: "Approach 2: Loop Without Slicing",
        filename: "reverse_string_loop.py",
        complexity: {
          time: "O(n)",
          space: "O(n)",
          timeExplanation: "One pass over the characters.",
          spaceExplanation: "List of n characters, joined once at the end.",
        },
        description: "Builds the reversed string by prepending characters into a list; avoids repeated string concatenation.",
        code: `def reverse_string(s):
    chars = []
    for i in range(len(s) - 1, -1, -1):
        chars.append(s[i])
    return "".join(chars)

if __name__ == "__main__":
    for s in ["hello", "Python", "a", ""]:
        print(f"{s!r} -> {reverse_string(s)!r}")`,
        terminal: {
          command: "python reverse_string_loop.py",
          inputs: [],
          output: [
            "'hello' -> 'olleh'",
            "'Python' -> 'nohtyP'",
            "'a' -> 'a'",
            "'' -> ''",
          ],
        },
      },
      {
        id: "two-pointer",
        name: "Approach 3: Two-Pointer Swap (In-Place on a List)",
        filename: "reverse_string_two_pointer.py",
        complexity: {
          time: "O(n)",
          space: "O(1) extra",
          timeExplanation: "n/2 swaps.",
          spaceExplanation: "Swaps in place on the list (LeetCode 344 style input).",
        },
        description: "Classic interview algorithm: swap the left and right characters and move both pointers inward.",
        code: `def reverse_in_place(chars):
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return chars

if __name__ == "__main__":
    print(reverse_in_place(list("hello")))
    print(reverse_in_place(list("ab")))`,
        terminal: {
          command: "python reverse_string_two_pointer.py",
          inputs: [],
          output: [
            "['o', 'l', 'l', 'e', 'h']",
            "['b', 'a']",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Empty String",
        example: "\"\"",
        handling: "Returns \"\" — slicing and the loop both handle it with no special case.",
      },
      {
        scenario: "Single Character",
        example: "\"a\"",
        handling: "Returned unchanged; two-pointer loop never runs because left == right.",
      },
      {
        scenario: "Unicode / Emoji",
        example: "\"héllo👋\"",
        handling: "Python strings are Unicode code points, so reversal works per character (combined emoji sequences may split).",
      },
    ],
  },
  {
    id: "palindrome-check",
    title: "Check if a String is a Palindrome",
    category: "String / Two Pointers",
    difficulty: "Easy / Foundational",
    sourceUrl: "https://leetcode.com/problems/valid-palindrome/",
    sourceLabel: "LeetCode 125: Valid Palindrome",
    summary: "A palindrome reads the same forwards and backwards (e.g. \"madam\", \"racecar\"). Common follow-up: ignore case, spaces and punctuation (\"A man, a plan, a canal: Panama\").",
    keyTakeaway: "Compare s with s[::-1] for the simple case; use two pointers with isalnum() to ignore non-letters in O(1) extra space.",
    approaches: [
      {
        id: "reverse-compare",
        name: "Approach 1: Compare With Reversed String",
        filename: "palindrome_reverse.py",
        complexity: {
          time: "O(n)",
          space: "O(n)",
          timeExplanation: "Reversal and comparison are each one pass.",
          spaceExplanation: "Stores the reversed copy.",
        },
        description: "Normalises to lowercase and compares the string with its reverse.",
        code: `def is_palindrome(s):
    s = s.lower()
    return s == s[::-1]

if __name__ == "__main__":
    for word in ["madam", "Racecar", "python", "a"]:
        print(f"{word}: {is_palindrome(word)}")`,
        terminal: {
          command: "python palindrome_reverse.py",
          inputs: [],
          output: [
            "madam: True",
            "Racecar: True",
            "python: False",
            "a: True",
          ],
        },
      },
      {
        id: "two-pointer",
        name: "Approach 2: Two Pointers, Ignore Non-Alphanumeric",
        filename: "palindrome_two_pointer.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "Each pointer moves at most n steps.",
          spaceExplanation: "Only two index variables.",
        },
        description: "Skips spaces/punctuation and compares characters case-insensitively from both ends.",
        code: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if not s[left].isalnum():
            left += 1
        elif not s[right].isalnum():
            right -= 1
        elif s[left].lower() != s[right].lower():
            return False
        else:
            left += 1
            right -= 1
    return True

if __name__ == "__main__":
    tests = ["A man, a plan, a canal: Panama", "race a car", "No 'x' in Nixon", ""]
    for t in tests:
        print(f"{t!r}: {is_palindrome(t)}")`,
        terminal: {
          command: "python palindrome_two_pointer.py",
          inputs: [],
          output: [
            "'A man, a plan, a canal: Panama': True",
            "'race a car': False",
            "\"No 'x' in Nixon\": True",
            "'': True",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Empty String",
        example: "\"\"",
        handling: "Treated as a palindrome (True) — confirm with the interviewer.",
      },
      {
        scenario: "Mixed Case",
        example: "\"Racecar\"",
        handling: "Lowercase both sides before comparing, otherwise \"R\" != \"r\".",
      },
      {
        scenario: "Punctuation & Spaces",
        example: "\"A man, a plan...\"",
        handling: "Approach 2 skips non-alphanumeric characters with isalnum().",
      },
    ],
  },
  {
    id: "factorial",
    title: "Factorial of a Number",
    category: "Math / Recursion / Loops",
    difficulty: "Easy / Foundational",
    summary: "Compute n! = n × (n-1) × ... × 1, with 0! = 1. Used to check that you know both iteration and recursion, and the base case.",
    keyTakeaway: "The iterative loop is safest; recursion is elegant but hits Python's recursion limit (~1000) for large n.",
    approaches: [
      {
        id: "iterative",
        name: "Approach 1: Iterative Loop",
        filename: "factorial_loop.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "n multiplications.",
          spaceExplanation: "Single accumulator variable.",
        },
        description: "Multiplies an accumulator from 2 up to n.",
        code: `def factorial(n):
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

if __name__ == "__main__":
    for n in [0, 1, 5, 10]:
        print(f"{n}! = {factorial(n)}")`,
        terminal: {
          command: "python factorial_loop.py",
          inputs: [],
          output: [
            "0! = 1",
            "1! = 1",
            "5! = 120",
            "10! = 3628800",
          ],
        },
      },
      {
        id: "recursive",
        name: "Approach 2: Recursion",
        filename: "factorial_recursive.py",
        complexity: {
          time: "O(n)",
          space: "O(n)",
          timeExplanation: "n recursive calls.",
          spaceExplanation: "Call stack grows to depth n.",
        },
        description: "n! = n × (n-1)!, with base case 0! = 1! = 1.",
        code: `def factorial(n):
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n <= 1:          # base case
        return 1
    return n * factorial(n - 1)

if __name__ == "__main__":
    for n in [0, 1, 5, 10]:
        print(f"{n}! = {factorial(n)}")`,
        terminal: {
          command: "python factorial_recursive.py",
          inputs: [],
          output: [
            "0! = 1",
            "1! = 1",
            "5! = 120",
            "10! = 3628800",
          ],
        },
      },
      {
        id: "math-lib",
        name: "Approach 3: Built-in math.factorial",
        filename: "factorial_math.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "Implemented in C, much faster for large n.",
          spaceExplanation: "No Python-level stack.",
        },
        description: "What you would use in production code — mention it after showing the manual version.",
        code: `import math

if __name__ == "__main__":
    print(math.factorial(5))
    print(math.factorial(20))`,
        terminal: {
          command: "python factorial_math.py",
          inputs: [],
          output: [
            "120",
            "2432902008176640000",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Zero",
        example: "0",
        handling: "0! = 1 by definition; the loop never runs and returns 1.",
      },
      {
        scenario: "Negative Input",
        example: "-3",
        handling: "Raise ValueError — factorial is undefined for negatives.",
      },
      {
        scenario: "Large n",
        example: "5000",
        handling: "Python ints have no overflow, but recursion exceeds the default limit; use the loop or math.factorial.",
      },
    ],
  },
  {
    id: "fibonacci",
    title: "Print Fibonacci Series",
    category: "Math / Loops / Recursion / DP",
    difficulty: "Easy / Foundational",
    sourceUrl: "https://leetcode.com/problems/fibonacci-number/",
    sourceLabel: "LeetCode 509: Fibonacci Number",
    summary: "Print the first n Fibonacci numbers (0, 1, 1, 2, 3, 5, 8, ...) where each number is the sum of the previous two.",
    keyTakeaway: "Naive recursion is O(2^n); the loop with two variables is O(n) time and O(1) space — always mention why.",
    approaches: [
      {
        id: "iterative",
        name: "Approach 1: Loop With Two Variables",
        filename: "fibonacci_loop.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "One addition per term.",
          spaceExplanation: "Only a and b are kept (plus the output list).",
        },
        description: "Keeps the last two numbers and shifts them forward each step.",
        code: `def fibonacci_series(n):
    series = []
    a, b = 0, 1
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

if __name__ == "__main__":
    print(fibonacci_series(10))
    print(fibonacci_series(1))
    print(fibonacci_series(0))`,
        terminal: {
          command: "python fibonacci_loop.py",
          inputs: [],
          output: [
            "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
            "[0]",
            "[]",
          ],
        },
      },
      {
        id: "recursive",
        name: "Approach 2: Recursion With Memoization",
        filename: "fibonacci_memo.py",
        complexity: {
          time: "O(n)",
          space: "O(n)",
          timeExplanation: "Each fib(k) is computed once thanks to the cache.",
          spaceExplanation: "Cache + recursion stack of depth n.",
        },
        description: "Plain recursion recomputes the same values exponentially; lru_cache fixes that.",
        code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

if __name__ == "__main__":
    print([fib(i) for i in range(10)])
    print("fib(50) =", fib(50))`,
        terminal: {
          command: "python fibonacci_memo.py",
          inputs: [],
          output: [
            "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
            "fib(50) = 12586269025",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "n = 0",
        example: "0",
        handling: "Return an empty list.",
      },
      {
        scenario: "n = 1",
        example: "1",
        handling: "Return [0].",
      },
      {
        scenario: "Plain recursion for n = 40",
        example: "fib(40)",
        handling: "Without memoization it makes ~300 million calls; use the loop or lru_cache.",
      },
    ],
  },
  {
    id: "prime-check",
    title: "Check if a Number is Prime",
    category: "Math / Loops",
    difficulty: "Easy / Foundational",
    sourceUrl: "https://leetcode.com/problems/count-primes/",
    sourceLabel: "LeetCode 204: Count Primes (Sieve follow-up)",
    summary: "A prime is a number greater than 1 that is divisible only by 1 and itself. Follow-up: print all primes up to n.",
    keyTakeaway: "Only check divisors up to √n; for many numbers use the Sieve of Eratosthenes.",
    approaches: [
      {
        id: "sqrt",
        name: "Approach 1: Trial Division up to √n",
        filename: "prime_check.py",
        complexity: {
          time: "O(√n)",
          space: "O(1)",
          timeExplanation: "Any factor larger than √n pairs with one smaller than √n.",
          spaceExplanation: "Constant extra memory.",
        },
        description: "Rejects n < 2, then tests divisors from 2 to √n.",
        code: `import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, math.isqrt(n) + 1):
        if n % i == 0:
            return False
    return True

if __name__ == "__main__":
    for n in [0, 1, 2, 17, 21, 97]:
        print(f"{n}: {is_prime(n)}")`,
        terminal: {
          command: "python prime_check.py",
          inputs: [],
          output: [
            "0: False",
            "1: False",
            "2: True",
            "17: True",
            "21: False",
            "97: True",
          ],
        },
      },
      {
        id: "sieve",
        name: "Approach 2: Sieve of Eratosthenes (All Primes ≤ n)",
        filename: "prime_sieve.py",
        complexity: {
          time: "O(n log log n)",
          space: "O(n)",
          timeExplanation: "Each composite is crossed out by its prime factors.",
          spaceExplanation: "Boolean list of size n + 1.",
        },
        description: "Marks multiples of each prime as non-prime; what remains are primes.",
        code: `def primes_up_to(n):
    if n < 2:
        return []
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for multiple in range(i * i, n + 1, i):
                is_prime[multiple] = False
    return [i for i, prime in enumerate(is_prime) if prime]

if __name__ == "__main__":
    print(primes_up_to(50))`,
        terminal: {
          command: "python prime_sieve.py",
          inputs: [],
          output: [
            "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "0 and 1",
        example: "0, 1",
        handling: "Not prime — must be handled before the loop.",
      },
      {
        scenario: "2",
        example: "2",
        handling: "The only even prime; the loop range is empty so it returns True.",
      },
      {
        scenario: "Negative Numbers",
        example: "-7",
        handling: "Not prime by definition (n < 2 check).",
      },
    ],
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    category: "Loops / Conditionals",
    difficulty: "Easy / Foundational",
    sourceUrl: "https://leetcode.com/problems/fizz-buzz/",
    sourceLabel: "LeetCode 412: Fizz Buzz",
    summary: "Print numbers 1 to n; for multiples of 3 print \"Fizz\", for multiples of 5 print \"Buzz\", for multiples of both print \"FizzBuzz\".",
    keyTakeaway: "Check the combined case (divisible by 15) first, or build the string so the order of checks does not matter.",
    approaches: [
      {
        id: "if-else",
        name: "Approach 1: if / elif Chain",
        filename: "fizzbuzz.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "One check per number.",
          spaceExplanation: "Nothing stored besides the loop variable.",
        },
        description: "The divisible-by-15 check must come first, otherwise it never runs.",
        code: `def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

if __name__ == "__main__":
    fizzbuzz(15)`,
        terminal: {
          command: "python fizzbuzz.py",
          inputs: [],
          output: [
            "1",
            "2",
            "Fizz",
            "4",
            "Buzz",
            "Fizz",
            "7",
            "8",
            "Fizz",
            "Buzz",
            "11",
            "Fizz",
            "13",
            "14",
            "FizzBuzz",
          ],
        },
      },
      {
        id: "string-build",
        name: "Approach 2: String Concatenation (Easy to Extend)",
        filename: "fizzbuzz_extensible.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "One pass.",
          spaceExplanation: "Small temporary string per number.",
        },
        description: "Adding a new rule (e.g. 7 -> \"Bazz\") is one dictionary entry.",
        code: `def fizzbuzz(n, rules={3: "Fizz", 5: "Buzz"}):
    result = []
    for i in range(1, n + 1):
        word = "".join(text for div, text in rules.items() if i % div == 0)
        result.append(word or str(i))
    return result

if __name__ == "__main__":
    print(fizzbuzz(15))`,
        terminal: {
          command: "python fizzbuzz_extensible.py",
          inputs: [],
          output: [
            "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Wrong Check Order",
        example: "i = 15",
        handling: "If i % 3 is checked first, 15 prints \"Fizz\" — check 15 first.",
      },
      {
        scenario: "n = 0",
        example: "0",
        handling: "Loop does not run; prints nothing.",
      },
    ],
  },
  {
    id: "count-vowels",
    title: "Count Vowels in a String",
    category: "String / Counting",
    difficulty: "Easy / Foundational",
    summary: "Count how many vowels (a, e, i, o, u) a string contains, ignoring case.",
    keyTakeaway: "Use a set for O(1) membership checks and lowercase the string once.",
    approaches: [
      {
        id: "loop-set",
        name: "Approach 1: Loop With a Vowel Set",
        filename: "count_vowels.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "One membership check per character.",
          spaceExplanation: "The vowel set has a fixed size of 5.",
        },
        description: "Lowercases the string and counts characters found in the set.",
        code: `def count_vowels(s):
    vowels = {"a", "e", "i", "o", "u"}
    count = 0
    for ch in s.lower():
        if ch in vowels:
            count += 1
    return count

if __name__ == "__main__":
    for s in ["Hello World", "PYTHON", "rhythm", ""]:
        print(f"{s!r}: {count_vowels(s)}")`,
        terminal: {
          command: "python count_vowels.py",
          inputs: [],
          output: [
            "'Hello World': 3",
            "'PYTHON': 1",
            "'rhythm': 0",
            "'': 0",
          ],
        },
      },
      {
        id: "sum-generator",
        name: "Approach 2: One-Liner With sum() + Per-Vowel Counts",
        filename: "count_vowels_counter.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "Single pass.",
          spaceExplanation: "Counter holds at most 5 keys.",
        },
        description: "Pythonic version, plus Counter to show how many times each vowel appears.",
        code: `from collections import Counter

def count_vowels(s):
    return sum(1 for ch in s.lower() if ch in "aeiou")

if __name__ == "__main__":
    text = "Interview Preparation"
    print("Total vowels:", count_vowels(text))
    print("Per vowel:", dict(Counter(ch for ch in text.lower() if ch in "aeiou")))`,
        terminal: {
          command: "python count_vowels_counter.py",
          inputs: [],
          output: [
            "Total vowels: 9",
            "Per vowel: {'i': 3, 'e': 3, 'a': 2, 'o': 1}",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Uppercase Letters",
        example: "\"PYTHON\"",
        handling: "Lowercase first so \"O\" is counted.",
      },
      {
        scenario: "No Vowels",
        example: "\"rhythm\"",
        handling: "Returns 0.",
      },
      {
        scenario: "Empty String",
        example: "\"\"",
        handling: "Returns 0.",
      },
    ],
  },
  {
    id: "anagram-check",
    title: "Check if Two Strings are Anagrams",
    category: "String / Hashing / Sorting",
    difficulty: "Easy / Foundational",
    sourceUrl: "https://leetcode.com/problems/valid-anagram/",
    sourceLabel: "LeetCode 242: Valid Anagram",
    summary: "Two strings are anagrams if they contain the same characters with the same counts, e.g. \"listen\" and \"silent\".",
    keyTakeaway: "Sorting is the simplest (O(n log n)); counting characters with Counter or a dict is O(n).",
    approaches: [
      {
        id: "sorting",
        name: "Approach 1: Sort and Compare",
        filename: "anagram_sort.py",
        complexity: {
          time: "O(n log n)",
          space: "O(n)",
          timeExplanation: "Sorting dominates.",
          spaceExplanation: "Sorted copies of both strings.",
        },
        description: "If the sorted characters match, the strings are anagrams.",
        code: `def is_anagram(a, b):
    return sorted(a) == sorted(b)

if __name__ == "__main__":
    pairs = [("listen", "silent"), ("triangle", "integral"), ("apple", "papel"), ("rat", "car")]
    for a, b in pairs:
        print(f"{a}, {b}: {is_anagram(a, b)}")`,
        terminal: {
          command: "python anagram_sort.py",
          inputs: [],
          output: [
            "listen, silent: True",
            "triangle, integral: True",
            "apple, papel: True",
            "rat, car: False",
          ],
        },
      },
      {
        id: "counting",
        name: "Approach 2: Character Count (Counter / dict)",
        filename: "anagram_counter.py",
        complexity: {
          time: "O(n)",
          space: "O(k)",
          timeExplanation: "One pass over each string.",
          spaceExplanation: "k = number of distinct characters.",
        },
        description: "Checks lengths first, then counts characters with a dictionary.",
        code: `from collections import Counter

def is_anagram(a, b):
    if len(a) != len(b):
        return False
    counts = {}
    for ch in a:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in b:
        if counts.get(ch, 0) == 0:
            return False
        counts[ch] -= 1
    return True

if __name__ == "__main__":
    print(is_anagram("listen", "silent"))
    print(is_anagram("rat", "car"))
    print(Counter("anagram") == Counter("nagaram"))  # one-liner version`,
        terminal: {
          command: "python anagram_counter.py",
          inputs: [],
          output: [
            "True",
            "False",
            "True",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Different Lengths",
        example: "\"abc\", \"abcd\"",
        handling: "Return False immediately.",
      },
      {
        scenario: "Case & Spaces",
        example: "\"Dormitory\", \"Dirty room\"",
        handling: "Normalise with .lower().replace(\" \", \"\") if the interviewer allows it.",
      },
    ],
  },
  {
    id: "swap-numbers",
    title: "Swap Two Numbers Without a Temp Variable",
    category: "Basics / Arithmetic / Bitwise",
    difficulty: "Easy / Foundational",
    summary: "Swap the values of two variables. Interviewers often ask for the version that does not use a third variable.",
    keyTakeaway: "In Python the answer is a, b = b, a (tuple unpacking); know the arithmetic and XOR tricks too.",
    approaches: [
      {
        id: "tuple",
        name: "Approach 1: Tuple Unpacking (Pythonic)",
        filename: "swap_tuple.py",
        complexity: {
          time: "O(1)",
          space: "O(1)",
          timeExplanation: "Constant work.",
          spaceExplanation: "A temporary tuple is created internally.",
        },
        description: "The right side is evaluated first, then unpacked into the variables.",
        code: `a, b = 10, 20
print(f"Before: a={a}, b={b}")
a, b = b, a
print(f"After:  a={a}, b={b}")`,
        terminal: {
          command: "python swap_tuple.py",
          inputs: [],
          output: [
            "Before: a=10, b=20",
            "After:  a=20, b=10",
          ],
        },
      },
      {
        id: "arithmetic",
        name: "Approach 2: Arithmetic and XOR",
        filename: "swap_math.py",
        complexity: {
          time: "O(1)",
          space: "O(1)",
          timeExplanation: "Three operations.",
          spaceExplanation: "No extra variable.",
        },
        description: "Classic language-agnostic tricks; XOR works only for integers.",
        code: `a, b = 10, 20
a = a + b   # 30
b = a - b   # 10
a = a - b   # 20
print(f"Arithmetic swap: a={a}, b={b}")

x, y = 5, 9
x = x ^ y
y = x ^ y
x = x ^ y
print(f"XOR swap: x={x}, y={y}")`,
        terminal: {
          command: "python swap_math.py",
          inputs: [],
          output: [
            "Arithmetic swap: a=20, b=10",
            "XOR swap: x=9, y=5",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Equal Values",
        example: "a = b = 7",
        handling: "All approaches still work.",
      },
      {
        scenario: "Floats With XOR",
        example: "1.5, 2.5",
        handling: "XOR is not defined for floats — use tuple unpacking.",
      },
    ],
  },
  {
    id: "missing-number",
    title: "Find the Missing Number in 1 to n",
    category: "Array / Math",
    difficulty: "Easy / Foundational",
    sourceUrl: "https://leetcode.com/problems/missing-number/",
    sourceLabel: "LeetCode 268: Missing Number (0..n variant)",
    summary: "An array contains n-1 distinct numbers from 1 to n with exactly one missing. Find the missing number.",
    keyTakeaway: "Expected sum n(n+1)/2 minus the actual sum gives the answer in O(n) time and O(1) space.",
    approaches: [
      {
        id: "sum-formula",
        name: "Approach 1: Sum Formula",
        filename: "missing_number_sum.py",
        complexity: {
          time: "O(n)",
          space: "O(1)",
          timeExplanation: "One pass to sum the array.",
          spaceExplanation: "Only a few integers.",
        },
        description: "Subtract the actual sum from the expected sum of 1..n.",
        code: `def find_missing(arr, n):
    expected = n * (n + 1) // 2
    return expected - sum(arr)

if __name__ == "__main__":
    print(find_missing([1, 2, 4, 5, 6], 6))
    print(find_missing([2, 3, 1, 5], 5))
    print(find_missing([1], 2))`,
        terminal: {
          command: "python missing_number_sum.py",
          inputs: [],
          output: [
            "3",
            "4",
            "2",
          ],
        },
      },
      {
        id: "set-diff",
        name: "Approach 2: Set Difference",
        filename: "missing_number_set.py",
        complexity: {
          time: "O(n)",
          space: "O(n)",
          timeExplanation: "Building the sets is linear.",
          spaceExplanation: "Set of n numbers.",
        },
        description: "Easy to read, and generalises to finding several missing numbers.",
        code: `def find_missing(arr, n):
    return sorted(set(range(1, n + 1)) - set(arr))

if __name__ == "__main__":
    print(find_missing([1, 2, 4, 5, 6], 6))
    print(find_missing([1, 3, 6], 6))   # multiple missing`,
        terminal: {
          command: "python missing_number_set.py",
          inputs: [],
          output: [
            "[3]",
            "[2, 4, 5]",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Missing Last Number",
        example: "[1, 2, 3], n=4",
        handling: "Formula gives 10 - 6 = 4.",
      },
      {
        scenario: "Missing First Number",
        example: "[2, 3, 4], n=4",
        handling: "Formula gives 10 - 9 = 1.",
      },
    ],
  },
  {
    id: "remove-duplicates",
    title: "Remove Duplicates From a List (Keep Order)",
    category: "List / Set / Hashing",
    difficulty: "Easy / Foundational",
    summary: "Remove repeated elements from a list. Follow-up: keep the original order of first appearance.",
    keyTakeaway: "set(lst) removes duplicates but loses order; dict.fromkeys(lst) keeps order in Python 3.7+.",
    approaches: [
      {
        id: "seen-set",
        name: "Approach 1: Loop With a \"seen\" Set",
        filename: "remove_duplicates_loop.py",
        complexity: {
          time: "O(n)",
          space: "O(n)",
          timeExplanation: "One set lookup per element.",
          spaceExplanation: "The seen set and result list.",
        },
        description: "Adds an element to the result only the first time it appears.",
        code: `def remove_duplicates(items):
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

if __name__ == "__main__":
    print(remove_duplicates([3, 1, 3, 2, 1, 5]))
    print(remove_duplicates(["a", "b", "a", "c"]))`,
        terminal: {
          command: "python remove_duplicates_loop.py",
          inputs: [],
          output: [
            "[3, 1, 2, 5]",
            "['a', 'b', 'c']",
          ],
        },
      },
      {
        id: "dict-fromkeys",
        name: "Approach 2: dict.fromkeys / set()",
        filename: "remove_duplicates_builtin.py",
        complexity: {
          time: "O(n)",
          space: "O(n)",
          timeExplanation: "Single pass.",
          spaceExplanation: "New dict or set.",
        },
        description: "dict.fromkeys keeps insertion order; set() does not guarantee any order.",
        code: `items = [3, 1, 3, 2, 1, 5]
print("Order kept:", list(dict.fromkeys(items)))
print("Using set :", sorted(set(items)), "(order not guaranteed, sorted here)")`,
        terminal: {
          command: "python remove_duplicates_builtin.py",
          inputs: [],
          output: [
            "Order kept: [3, 1, 2, 5]",
            "Using set : [1, 2, 3, 5] (order not guaranteed, sorted here)",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Unhashable Items",
        example: "[[1], [1]]",
        handling: "Lists cannot go in a set; convert to tuples first or compare with ==.",
      },
      {
        scenario: "Empty List",
        example: "[]",
        handling: "Returns [].",
      },
    ],
  },
  {
    id: "char-frequency",
    title: "Count Frequency of Each Character / Word",
    category: "String / Dictionary / Counter",
    difficulty: "Easy / Foundational",
    summary: "Count how many times each character (or word) appears in a string — one of the most common Python dictionary questions.",
    keyTakeaway: "Use dict.get(key, 0) + 1 to show you understand dictionaries; mention collections.Counter as the built-in.",
    approaches: [
      {
        id: "dict",
        name: "Approach 1: Dictionary With get()",
        filename: "char_frequency.py",
        complexity: {
          time: "O(n)",
          space: "O(k)",
          timeExplanation: "One dictionary update per character.",
          spaceExplanation: "k = distinct characters.",
        },
        description: "Skips spaces and increments a count for each character.",
        code: `def char_frequency(s):
    freq = {}
    for ch in s:
        if ch == " ":
            continue
        freq[ch] = freq.get(ch, 0) + 1
    return freq

if __name__ == "__main__":
    print(char_frequency("hello world"))`,
        terminal: {
          command: "python char_frequency.py",
          inputs: [],
          output: [
            "{'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}",
          ],
        },
      },
      {
        id: "counter",
        name: "Approach 2: collections.Counter (Words Too)",
        filename: "word_frequency_counter.py",
        complexity: {
          time: "O(n)",
          space: "O(k)",
          timeExplanation: "Counter does the same counting in C.",
          spaceExplanation: "One entry per distinct key.",
        },
        description: "most_common() returns the top items sorted by count.",
        code: `from collections import Counter

text = "the cat and the hat and the bat"
words = Counter(text.split())
print(words)
print("Top 2:", words.most_common(2))
print("Letters:", Counter("banana"))`,
        terminal: {
          command: "python word_frequency_counter.py",
          inputs: [],
          output: [
            "Counter({'the': 3, 'and': 2, 'cat': 1, 'hat': 1, 'bat': 1})",
            "Top 2: [('the', 3), ('and', 2)]",
            "Letters: Counter({'a': 3, 'n': 2, 'b': 1})",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Case Sensitivity",
        example: "\"Aa\"",
        handling: "\"A\" and \"a\" are counted separately unless you lowercase first.",
      },
      {
        scenario: "Empty String",
        example: "\"\"",
        handling: "Returns {}.",
      },
    ],
  },
  {
    id: "armstrong-number",
    title: "Sum of Digits & Armstrong Number",
    category: "Math / Loops",
    difficulty: "Easy / Foundational",
    summary: "Sum the digits of a number (123 -> 6). Then check for an Armstrong number: the sum of its digits each raised to the number of digits equals the number itself (153 = 1³ + 5³ + 3³).",
    keyTakeaway: "Extract digits with % 10 and // 10, or convert to a string — both are accepted.",
    approaches: [
      {
        id: "modulo",
        name: "Approach 1: Digit Extraction With % and //",
        filename: "armstrong_modulo.py",
        complexity: {
          time: "O(d)",
          space: "O(1)",
          timeExplanation: "d = number of digits.",
          spaceExplanation: "A few integers.",
        },
        description: "Takes the last digit with % 10 and drops it with // 10.",
        code: `def sum_of_digits(n):
    n = abs(n)
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

def is_armstrong(n):
    power = len(str(n))
    total, temp = 0, n
    while temp > 0:
        total += (temp % 10) ** power
        temp //= 10
    return total == n

if __name__ == "__main__":
    print("Sum of digits of 12345:", sum_of_digits(12345))
    for n in [153, 370, 9474, 123]:
        print(f"{n} Armstrong? {is_armstrong(n)}")`,
        terminal: {
          command: "python armstrong_modulo.py",
          inputs: [],
          output: [
            "Sum of digits of 12345: 15",
            "153 Armstrong? True",
            "370 Armstrong? True",
            "9474 Armstrong? True",
            "123 Armstrong? False",
          ],
        },
      },
      {
        id: "string",
        name: "Approach 2: Convert to String",
        filename: "armstrong_string.py",
        complexity: {
          time: "O(d)",
          space: "O(d)",
          timeExplanation: "One pass over the digits.",
          spaceExplanation: "String of d characters.",
        },
        description: "Short and readable; good to mention after the modulo version.",
        code: `def is_armstrong(n):
    digits = str(n)
    return n == sum(int(d) ** len(digits) for d in digits)

if __name__ == "__main__":
    print("Sum of digits of 12345:", sum(int(d) for d in "12345"))
    print("Armstrong numbers below 1000:", [n for n in range(1, 1000) if is_armstrong(n)])`,
        terminal: {
          command: "python armstrong_string.py",
          inputs: [],
          output: [
            "Sum of digits of 12345: 15",
            "Armstrong numbers below 1000: [1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407]",
          ],
        },
      },
    ],
    edgeCases: [
      {
        scenario: "Zero",
        example: "0",
        handling: "Sum of digits is 0; while n > 0 never runs.",
      },
      {
        scenario: "Negative Numbers",
        example: "-123",
        handling: "Use abs(n) before extracting digits.",
      },
    ],
  },
];
