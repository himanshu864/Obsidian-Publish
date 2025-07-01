---
title: Binary Exponential
---

#concept : [[Math]]

Binary/Fast Exponentiation (or _Exponentiation by Squaring_) is an efficient algorithm to compute $a^b$ in $O(\log b)$ time. It is commonly used in modular arithmetic, cryptography, and problems requiring fast power calculations.

#### Why Fast Exponentiation?

Naïve exponentiation computes $a^b$ by multiplying $a$ with itself $b$ times, which has $O(b)$ time complexity. Fast Exponentiation reduces this complexity to $O(\log b)$ by using repeated squaring and halving of the exponent.

---

## Algorithm

Fast Exponentiation uses these principles:

1. If $b$ is _even_: $a^b=(a^{b/2})^2$
2. If $b$ is _odd_: $a^b =a \cdot a^{b- 1}$

The algorithm repeatedly reduces the exponent $b$ by half until $b = 0$, achieving logarithmic time complexity.

---

## Code

```cpp
// Recursive
int recFastExp(int a, int b)
{
    if (b == 0)
        return 1;
    if (b % 2)
        return a * recFastExp(a, b - 1);
    int x = recFastExp(a, b / 2);
    return x * x;
}

// Iterative
int itrFastExp(int a, int b)
{
    int ans = 1;
    while (b)
    {
        if (b % 2)
            ans *= a;
        a = a * a;
        b /= 2;
    }
    return ans;
}
```

---

## Inverse Exponentiation

Also had negative $b$

```cpp
double myPow(double x, int n)
{
    if (n < 0)
        return 1.0 / myPow(x, -n);
    if (n == 0)
        return 1;
    if (n == 2)
        return x * x;
    return (n % 2 ? x : 1) * myPow(myPow(x, n / 2), 2);
}
```
