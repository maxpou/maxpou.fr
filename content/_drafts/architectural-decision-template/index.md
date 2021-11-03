---
title: 'My Architectural Decision Template'
slug: architectural-decision
language: en
date: 2042-01-01
tags:
  - Architecture
---

In my career, I took various architectural decisions. And often, these decisions had an impact on
the project's life.

Writing an Architectural Decision Record might look a bit academic or corporative but, I believe it
good to document the decision. It also helps future developers to understand the decision.

## Template

```markdown
# Title

Status: Proposed | Accepted | Deprecated Decision: which solution

## Burning platform

Why are you here today thinking about a different architecture/drastic change.  
Try to be as factual as possible. Feel free to provide metrics.

## Propositions

### Proposition 1

_Small description of what is this solution about._

- list positive/negative consequences
- pros&cons

### Proposition 2

_Small description of what is this solution about._

- list positive/negative consequences
- pros&cons

## (Optional) recap

(insert a comparative table where you compare propositions)  
Example of elements to compare: effort, learning curve, available market skills...

## (Optional) Aditional resources

links
```

**Notes:**

- I like to put the actual system as the 1st proposition.
- Be honest. In this list, you probably have a favorite proposition. If your solution appears to be
  a silver bullet, you will lose all credibility.
- You can also put a link to a POC. But keep in mind that, a freshly written hello-world will most
  of the time looks better than a few-years-old living codebase. Also beaware of hello world driven
  decision.
- if the

## Focus #1: go straight to the point

This document is not intended to be published and sold in a bookstore. Feel free to abuse from
bullet list (but don't go too crazy!). Also, keep in mind that more words means more room for
misinterpretation.

The document should not exceed 1 or 2 pages.

## Focus #2: Banwords

- Words like "simple", "just", "of course", "everyone knows", "easy" don't add any value. In fact,
  it often does the opposite. Something simple is not necessarily simple for everybody;
- pejorative words. Respect your elders! Also, keep in mind that the decision-maker might be
  involved in the previous system. You want him as an ally not an ennemy. Also, when something is
  bad, it's something know
