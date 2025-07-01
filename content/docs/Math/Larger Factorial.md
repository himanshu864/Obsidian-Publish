---
title: Larger Factorial
---

#concept : [[Math]]

Factorials grow extremely fast, making them impractical to store in standard data types for large $n$. For instance, $20! = 2,432,902,008,176,640,000$ exceeds the capacity of 32-bit and 64-bit integers.

To handle this, we represent the result as a collection of digits and multiply one by one manually.

Very useful for **[[Combinatorics]]**: Calculating permutations and combinations.  
$$ nCr = \frac{n!}{r!(n-r)!} $$

---

## Algorithm

1. Initialize the result as $[1]$ (representing $0!$ and $1!$).
2. Multiply the result by every integer from $2$ to $n$ in reversed order:
   - For each digit, calculate the product and update it while propagating any carry.
   - Append new digits for remaining carry after multiplication.
3. Reverse the result at the end to display digits in the correct order.

---

## Code:

```cpp
vector<int> largerFactorial(int n)
{
    // Initialize with 1 (0! and 1!)
    vector<int> result = {1};

    // Multiply numbers from 2 to n in reverse
    for (int i = 2; i <= n; i++)
    {
        int carry = 0;
        for (int j = 0; j < result.size(); j++)
        {
            int prod = result[j] * i + carry;
            result[j] = prod % 10;
            carry = prod / 10;
        }
        // Add remaining carry as new digits
        while (carry)
        {
            result.push_back(carry % 10);
            carry /= 10;
        }
    }

    // Reverse to correct order
    reverse(result.begin(), result.end());
    return result;
}
```

**Time Complexity**: $O(n \cdot d)$
**Space Complexity**: $O(d)$
