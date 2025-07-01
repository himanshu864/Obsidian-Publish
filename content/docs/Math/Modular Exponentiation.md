---
title: Modular Exponentiation
---

#concept : [[Math]]

To handle large results efficiently, [[Binary Exponential]] is often used with [[Modulo]] $m$, i.e., compute $(a^b) \mod m$.

1. If $b$ is *even*:  
   $(a^b) \mod m = [(a^{b/2})^2] \mod m$
2. If $b$ is *odd*:  
   $(a^b) \mod m = [a \cdot (a^{b-1})] \mod m$

```cpp
int mod = 1e9 + 7;

// Recursive
int modExp(int a, int b)
{
    if (b == 0)
        return 1;

    if (b & 1)
        return (a * 1LL * modExp(a, b - 1)) % mod;

    int x = modExp(a, b >> 1);
    return (x * 1LL * x) % mod;
}

// Iterative
int modExp(int a, int b)
{
    int ans = 1;
    while (b > 0)
    {
        if (b & 1)
            ans = (ans * 1LL * a) % mod;
        a = (a * 1LL * a) % mod;
        b >>= 1;
    }
    return ans;
}
```
