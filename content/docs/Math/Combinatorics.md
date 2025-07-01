---
title: Combinatorics
---

#concept : [[Math]]

Combinatorics is the branch of mathematics that studies the counting, arrangement, and combination of objects.

---

# Factorial of a number $(n!)$

It tells how many ways are there to arrange $n$ items in an ordered manner.

$$n! = n \times (n - 1) \times \ldots \times 1$$

```cpp
const int mod = 1e9 + 7;

int fact(int n)
{
    int ans = 1;
    for (int i = 2; i <= n; i++)
        ans = (ans * 1LL * i) % mod;
    return ans;
}
```

TC : $O(n)$

Can also check out [[Larger Factorial]].

---

# Combinations $(^nC_r)$

It represents number of ways of combinatorially choosing $r$ different items out of a total of $n$ different items. _Order doesn't matter_.
$$^nC_r = \frac{n!}{r! \times (n-r)!}$$
Upon opening factorial, we get
$$\frac{n \times (n - 1) \times \ldots \times (n - r + 1)}{r!} \in I$$
Since combinations must be an integer. We can conclude

> **Divisibility of Product of Consecutive Integers**
> Product of any $r$ consecutive numbers is always divisible by $r!$

---

# Permutations $(^nP_r)$

It represent the number of ways to select and arrange $r$ different items out of a total of $n$ different items. _Order matters_.
$$^nP_r = \frac{n!}{(n-r)!}$$
$$^nP_r = (^nC_r) \times n!$$

> To Arrange $n$ items out of which $r$ are identical

$$\frac{n!}{r!}$$

---

# Programs for $^nC_r$

In modular arithmetic, computing binomial coefficients efficiently involves modular inverses because direct division is not allowed under [[Modulo]]. The formula becomes:  
$$ ^nC_r \mod m = \frac{n!}{r!\times(n-r)!} \mod m $$
$$ ^nC_r \mod m = n! \times (r!)^{-1} \times ((n-r)!)^{-1} \mod m $$
Here, $(r!)^{-1}$ and $((n-r)!)^{-1}$ are the **[[Modular Inverses]]** of $r!$ and $(n-r)!$ under modulo $m$.

---

#### Approach 1 : Single $^nC_r$ with Modular Arithmetic for small $r$

> For $n \le 10^9$ and $r \le 20$.

Instead of dividing by denominator, use modular inverse.
And optimize factorization of nominator by expanding.

```cpp
class Combinatorics
{
    int mult(int a, int b)
    {
        return (a * 1LL * b) % mod;
    }

    int modExp(int a, int b)
    {
        if (b == 0)
            return 1;
        if (b & 1)
            return mult(a, modExp(a, b - 1));
        int x = modExp(a, b >> 1);
        return mult(x, x);
    }
    int inverse(int x)
    {
        return modExp(x, mod - 2);
    }

public:
    int nCr(int n, int r)
    {
        r = min(r, n - r);
        int num = 1, den = 1;
        for (int i = 1; i <= r; i++)
        {
            num = mult(num, n - i + 1);
            den = mult(den, i);
        }
        return mult(num, inverse(den));
    }
};
```

TC : $O(r)$

---

#### Approach 2 : Basic $^nC_r$ without Modular Arithmetic for small $n$

> For $n \le 40$

We can save all factorials as `long long` without overflowing. No `mod` required.
Works because of divisibility of Product of consecutive integers.

```cpp
class Combinatorics
{
public:
    int nCr(int n, int r)
    {
        int ans = 1;
        for (int i = 1; i <= min(r, n - r); i++)
        {
            ans *= (n - i + 1);
            ans /= i;
        }
        return ans;
    }
};
```

TC : $O(r)$

---

#### Approach 3 : Pascal for non-prime Modulo

> For $n \le 1000$ and $r \le n$. But $mod$ isn't prime.

Since $mod$ is not a prime number, Inverses wouldn't always exist.
Use Formula to build a _Pascal_'s triangle.
$$^{n - 1}C_r + ^{n - 1}C_{r - 1} = ^nC_r$$

```cpp
class Combinatorics
{
    int dp[1001][1001];

public:
    int nCr(int n, int r, int m)
    {
        dp[0][0] = 1;
        for (int i = 1; i <= n; i++)
            for (int j = 0; j <= i; j++)
                dp[i][j] = ((j ? dp[i - 1][j - 1] : 0) + dp[i - 1][j]) % m;
        return dp[n][r];
    }
};
```

TC : $O(n^2)$

---

#### Approach 4 : Pre-computation for query

> If given $q$ queries and you have to calculate $^nC_r \mod 10^9$ with $n, q, r \le 10^6$.

1. **Precompute Factorials Modulo $m$**:
   As we know $!0 = 1$ and:
   $$!n = n \cdot !(n - 1) \mod m$$
   Using this property, we can compute all factorials $fact[i]$ for $i$ from $1$ to $N - 1$.
2. **Precompute Modular Inverses of Factorials**:
   Use [[Modular Inverses]] on $fact[N]$ to compute $invFact[N]$
   $$ a^{-1} = a^{m-2} \mod m $$
   As we know:
$$\frac{1}{(n - 1)!} = \frac{1}{n!} \cdot n! \mod m$$
   Using this property we can also tabulate $invFact[i]$ for $i$ from $N - 1$ to $0$.
3. **Efficient Binomial Coefficient Calculation**:
   Using precomputed values:
   $$ ^nC_r \mod m = \text{fact}[n] \cdot \text{invFact}[r] \cdot \text{invFact}[n-r] \mod m $$

```cpp
class Combinatorics
{
    vector<int> fact, invFact;

    int mult(int a, int b)
    {
        return (a * 1LL * b) % mod;
    }
    int modExp(int a, int b)
    {
        int ans = 1;
        while (b > 0)
        {
            if (b & 1)
                ans = mult(ans, a);
            a = mult(a, a);
            b >>= 1;
        }
        return ans;
    }
    int inverse(int a)
    {
        return modExp(a, mod - 2);
    }

public:
    Combinatorics(int n)
    {
        fact.resize(n + 1);
        fact[0] = 1;
        for (int i = 1; i <= n; i++)
            fact[i] = mult(fact[i - 1], i);

        invFact.resize(n + 1);
        invFact[n] = inverse(fact[n]);
        for (int i = n - 1; i >= 0; i--)
            invFact[i] = mult(invFact[i + 1], i + 1);
    }

    int nCr(int n, int r)
    {
        return mult(fact[n], mult(invFact[r], invFact[n - r]));
    }
};
```

**Pre-computations**: $O(N + \log(mod))$ & $O(N)$
**Query**: $O(1)$ & $O(1)$
