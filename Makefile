MAKEFLAGS = -j1

.PHONY: gh-pages

REMOTE_URL = $(shell git remote get-url origin)


gh-pages:
	@echo $(REMOTE_URL)
	rm -rf dist
	npm run example
	cd dist; \
	git init; \
	git add .; \
	git commit -m"init"; \
	git remote add origin $(REMOTE_URL); \
	git push origin master:gh-pages --force
