---
title: Euclidean Algorithm - GCD
---

#concept : [[Math]]

The **Euclidean Algorithm** is a method for finding the **Greatest Common Divisor (GCD)** of two integers.

The GCD is the largest integer that divides both numbers without leaving a remainder.

## Algorithm:

---

The Euclidean Algorithm is based on the principle that:

> The GCD of two numbers a and b is the same as the GCD of b and a mod b.

This means:

```python
gcd(a,b) = gcd(b,a %  b)
```

It continues until b=0, at which point a is the GCD.

## Code:

---

```cpp
int gcd(int a, int b)
{
    if (b == 0)
        return a;
    return gcd(b, a % b);
}
```

# LCM

---

As we know, `|a * b| == lcm(a,b) * gcd(a, b)`

Therefore we can efficiently find lcm using same algorithm:

```python
int lcm = abs(a * b) / gcd(a,b);
```
