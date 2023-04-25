.PHONY: clean clean-test clean-pyc clean-build docs help
.DEFAULT_GOAL := help

define BROWSER_PYSCRIPT
import os, webbrowser, sys

from urllib.request import pathname2url

webbrowser.open("file://" + pathname2url(os.path.abspath(sys.argv[1])))
endef
export BROWSER_PYSCRIPT

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

BROWSER := python -c "$$BROWSER_PYSCRIPT"

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

clean: clean-build clean-pyc clean-test ## remove all build, test, coverage and Python artifacts

clean-build: ## remove build artifacts
	rm -fr build/
	rm -fr dist/
	rm -fr .eggs/
	find . -name '*.egg-info' -exec rm -fr {} +
	find . -name '*.egg' -exec rm -f {} +

clean-pyc: ## remove Python file artifacts
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -name '__pycache__' -exec rm -fr {} +

clean-test: ## remove test and coverage artifacts
	rm -fr .tox/
	rm -f .coverage
	rm -fr htmlcov/
	rm -fr .pytest_cache

lint: ## check style with flake8
	flake8 shinyswatch tests

test: ## run tests quickly with the default Python
	pytest

test-all: ## run tests on every Python version with tox
	tox

coverage: ## check code coverage quickly with the default Python
	coverage run --source shinyswatch -m pytest
	coverage report -m
	coverage html
	$(BROWSER) htmlcov/index.html

quarto-shinylive: ## Make sure quarto-shinylive is installed
	cd docs && (test -f _extensions/quarto-ext/shinylive/shinylive.lua || quarto install extension --no-prompt quarto-ext/shinylive)
docs-quartodoc: quarto-shinylive ## Build quartodoc
	cd docs && python -m quartodoc build
docs-render: quarto-shinylive
	cd docs && quarto render
docs-ci: docs-quartodoc docs-render ## Build quartodoc for CI
docs-open:
	$(BROWSER) docs/_site/index.html
docs-watch: quarto-shinylive
	cd docs && quarto preview
docs: docs-ci docs-open ## generate quartodoc HTML documentation, including API docs

# # Perform `quarto preview` and `quartodoc build` in parallel
# watchdocs: quarto-shinylive
# 	cd docs && quarto preview &
# 	watchmedo shell-command -p 'shinyswatch/*.py' -c 'cd docs && python -m quartodoc build' -R -D . &
# 	wait

release: dist ## package and upload a release
	twine upload dist/*

dist: clean ## builds source and wheel package
	python3 setup.py sdist
	python3 setup.py bdist_wheel
	ls -l dist

install: dist ## install the package to the active Python's site-packages
	pip uninstall -y shinyswatch
	python3 -m pip install dist/shinyswatch*.whl

pyright: ## type check with pyright
	pyright

check: pyright lint ## check code quality with pyright, flake8, black and isort
	echo "Checking code with black."
	black --check .
	echo "Sorting imports with isort."
	isort --check-only --diff .
