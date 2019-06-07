codepen generator for remark
============================

Convert a yaml component specification to an embedded HTML codepen snippet.

Minimal example:

``` yaml
component: codepen
id: 'codepen-minimal'
slug: LpOJzM
user: ImagineProgramming
```

Typical example:

```
---
component: codepen
id: 'codepen-typical'
data:
  height: 265 
  theme-id: 0
  default-tab: result
  user: ImagineProgramming
  slug-hash: LpOJzM
  pen-title: Particle Swarm [Magnetic Field recreation]
---
```