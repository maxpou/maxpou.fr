

```
# number of files
find . -name "*.vue" -not -path "**/node_modules/**" | wc -l

# loc
find . -name '*.vue' -not -path "**/node_modules/**" | xargs wc -l
```

monorepo/app
252073 (74913+177160) loc vue
402287 (273396+128891) loc js
2479 (1320+1159) js files
2947 (615+2332) vue files
1 big app divided in 35 apps