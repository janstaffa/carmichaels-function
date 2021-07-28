export const isPrime = (n: number) => {
  if (n === 1 || n === 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  let count = 5;

  while (Math.pow(count, 2) <= n) {
    if (n % count === 0 || n % (count + 2) === 0) return false;

    count += 6;
  }

  return true;
};

export const gcd = (n1: number, n2: number): number => {
  if (!n2) {
    return n1;
  }

  return gcd(n2, n1 % n2);
};

export const lcm = (n1: number, n2: number): number => {
  return !n1 || !n2 ? 0 : Math.abs((n1 * n2) / gcd(n1, n2));
};

export const lcmm = (numbers: number[]) => {
  let response = 1;
  for (const n of numbers) {
    response = lcm(n, response);
  }
  return response;
};

export const getCoprimeFactorPair = (n: number) => {
  let response: number[] | undefined = [];
  for (let i = 2; i < n; i++) {
    if (gcd(i, n / i) === 1) {
      response.push(i);
      response.push(n / i);
      break;
    }
  }
  return response.length > 0 ? response : undefined;
};
export const isOdd = (n: number) => !((n + 1) % 2 === 1);

export const sieveOfEratosthenes = (n: number) => {
  const primes: number[] = [];
  const prime = Array.from({ length: n + 1 }, () => true);

  for (let i = 0; i < n; i++) prime[i] = true;

  for (let p = 2; p * p <= n; p++) {
    if (prime[p] == true) {
      for (let i = p * 2; i <= n; i += p) prime[i] = false;
    }
  }

  for (let i = 2; i <= n; i++) {
    if (prime[i] == true) primes.push(i);
  }

  return primes;
};

export const isPowerOfOddPrime = (n: number, primes: number[]): boolean => {
  for (const prime of primes) {
    if (!isOdd(prime)) continue;
    if (prime > n) break;

    if (n % prime === 0) {
      let tn = n;
      while (tn % prime === 0) {
        tn /= prime;
      }

      if (tn === 1) return true;
      break;
    }
  }
  return false;
};

export const eulersTotient = (n: number) => {
  let totalCoprimes = 0;
  for (let i = 1; i < n; i++) {
    if (gcd(n, i) === 1) {
      totalCoprimes += 1;
    }
  }
  return totalCoprimes;
};

export const isPowerOfTwo = (n: number) => n && (n & (n - 1)) === 0;

export const extractExponent = (n: number, base: number) => {
  for (let i = 1; i < n; i++) {
    if (Math.pow(n, 1 / i) === base) return i;
  }

  return 0;
};
export const carmichaelFunction = (n: number): number => {
  if (n === 1) return n;
  if (isPrime(n)) return n - 1;

  const factorPair = getCoprimeFactorPair(n) || [n];
  const primes = sieveOfEratosthenes(n);

  const handleNumber = (num: number) => {
    if (isPowerOfTwo(num)) {
      const exponent = extractExponent(num, 2);
      if (exponent === 0) {
        return 0;
      }
      if (exponent < 3) {
        return Math.pow(2, exponent - 1);
      } else {
        return Math.pow(2, exponent - 2);
      }
    }

    if (isPowerOfOddPrime(num, primes)) {
      return eulersTotient(num);
    }
    if (primes.includes(num)) {
      return num - 1;
    }

    //343 does not have a coprime pair
    const coprimePair = getCoprimeFactorPair(num);

    if (coprimePair) {
      return lcm(
        carmichaelFunction(coprimePair[0]),
        carmichaelFunction(coprimePair[1])
      );
    }
    return 0;
  };

  if (primes.includes(n) || isPowerOfOddPrime(n, primes) || isPowerOfTwo(n)) {
    return handleNumber(n);
  }

  const finalNumbers: number[] = factorPair.map(handleNumber);
  return lcmm(finalNumbers);
};
