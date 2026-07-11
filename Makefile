YARN ?= npx yarn

.PHONY: install dev build clean

install:
	$(YARN) install

dev:
	$(YARN) dev

build:
	$(YARN) build

clean:
	rm -rf dist node_modules
