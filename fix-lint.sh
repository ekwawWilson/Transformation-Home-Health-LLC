#!/bin/bash

# Fix all apostrophes in files
find app -name "*.tsx" -type f -exec sed -i "s/we're/we\&apos;re/g" {} +
find app -name "*.tsx" -type f -exec sed -i "s/Here's/Here\&apos;s/g" {} +
find app -name "*.tsx" -type f -exec sed -i "s/what's/what\&apos;s/g" {} +
find app -name "*.tsx" -type f -exec sed -i "s/life's/life\&apos;s/g" {} +
find app -name "*.tsx" -type f -exec sed -i "s/We'll/We\&apos;ll/g" {} +
find app -name "*.tsx" -type f -exec sed -i "s/you're/you\&apos;re/g" {} +
find app -name "*.tsx" -type f -exec sed -i "s/doesn't/doesn\&apos;t/g" {} +
find app -name "*.tsx" -type f -exec sed -i "s/Let's/Let\&apos;s/g" {} +
find app -name "*.tsx" -type f -exec sed -i "s/can't/can\&apos;t/g" {} +

echo "Fixed apostrophes"
