---
title: Prime Factorisation
---

#concept: [[Math]]

Prime factorization is the process of expressing a number $n$ as a product of its prime factors.  
For example: $60 = 2^2 \cdot 3 \cdot 5$

```cpp
vector<int> primeFactorials(int n)
{
    vector<int> ans;
    for (int i = 2, x = sqrt(n); i <= x; i++)
        if (n % i == 0)
        {
            ans.push_back(i);
            while (n % i == 0)
                n /= i;
        }
    return ans;
}
```

- **Time Complexity**:
- Without pre-computation: $O(\sqrt{n})$
- With precomputed primes: $O(\frac{n}{\log n})$ (using [[Sieve of Eratosthenes]]).
