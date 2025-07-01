---
title: Segmented Sieve
---

#concept : [[Math]]

The **Segmented Sieve** is an extension of the [[Sieve of Eratosthenes]] used to find prime numbers in a range $[L, R]$, especially when $R$ is very large (e.g., $10^9$).

Instead of sieving up to $R$ directly, the segmented sieve uses precomputed primes up to $\sqrt{R}$ to mark non-prime numbers in the range $[L, R]$.

## Steps:

---

1. **Generate Primes Up to $\sqrt{R}$**:
   - Use the Sieve of Eratosthenes to find all primes $\leq \sqrt{R}$. These are the "base primes."
2. **Create a Boolean Array for Range $[L, R]$**:
   - Let `isPrime[i]` represent whether $L + i$ is prime.
   - Initialize all values to `true` (assume all are prime initially).
3. **Mark Non-Primes Using Base Primes**:
   - For each base prime $p$:
     - Find the smallest multiple of $p$ in $[L, R]$:  
       $start = \max(p^2, L + (p - L \% p) \% p)$
     - Mark all multiples of $p$ in the range as non-prime.
4. **Remaining True Indices Are Primes**:
   - The indices in `isPrime` still marked `true` correspond to prime numbers in $[L, R]$.

## Algorithm:

---

- Instead of marking primes for all numbers up to $R$, this method only processes numbers in $[L, R]$.
- Uses the precomputed primes up to $\sqrt{R}$ to ensure efficiency.

## Code:

---

```cpp
vector<int> sieve(int n)
{
    vector<int> primes;
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int i = 2; i <= n; i++)
        if (isPrime[i])
        {
            primes.push_back(i);
            for (int j = i * i; j <= n; j += i)
                isPrime[j] = false;
        }
    return primes;
}

vector<int> segmentedSieve(int L, int R)
{
	// Precompute primes upto sqrt(R) as base
    vector<int> basePrimes = sieve(floor(sqrt(R)));
    vector<bool> rangeIsPrime(R - L + 1, true);

    // Mark non-primes in [L, R] using base primes
    for (int p : basePrimes)
    {
        // first multiple of p inside range
        int start = max(p * p, L + (p - L % p) % p);
        for (int i = start; i <= R; i += p)
            rangeIsPrime[i - L] = false;
    }

	// Return remaining true indices as primes
    vector<int> rangePrimes;
    for (int i = 0; i <= R - L; i++)
        if (rangeIsPrime[i])
            rangePrimes.push_back(L + i);
    return rangePrimes;
}
```

## Complexity:

---

**Time Complexity**:

- $O(\sqrt{R} \log \log \sqrt{R})$ (for base primes)
- $O((R - L) \cdot \text{base primes})$ (for marking range)

**Space Complexity**:

- $O(\sqrt{R})$ for base primes.
- $O(R - L)$ for the range boolean array.
