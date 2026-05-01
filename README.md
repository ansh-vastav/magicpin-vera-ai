# Vera AI Challenge Submission

## Overview
This project is a context-aware decision engine that generates intelligent business messages for merchants based on category, triggers, and real-time signals.

## What it does
- Suggests actions to merchants
- Generates smart, actionable messages
- Helps improve engagement and sales

## How it works
1. Takes input:
   - category (restaurant, salon, pharmacy, etc.)
   - trigger (high_search, low_sales, weekend, etc.)
   - merchant data (optional)

2. Applies decision logic

3. Returns:
   - message
   - CTA (call to action)
   - rationale (why this suggestion)

## Features
- Context-aware messaging  
- Category-specific strategies  
- Time-based and demand-based triggers  
- Dynamic outputs (realistic simulation)

## Example

### Input
```json
{
  "category": "restaurant",
  "trigger": "high_search",
  "merchant": { "top_item": "Pizza Combo" }
}
