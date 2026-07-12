YARN ?= yarn

.PHONY: install dev build clean vault_decrypt vault_encrypt vault_view

install:
	$(YARN) install

dev:
	$(YARN) dev

build:
	$(YARN) build

clean:
	rm -rf dist node_modules

# ── ansible-vault (infra/ansible/secrets.yml) ────────────────────────────────
# Uzycie: ANSIBLE_PASSWORD='haslo' make vault_decrypt|vault_encrypt|vault_view

vault_decrypt:
	@bash infra/scripts/vault.sh decrypt

vault_encrypt:
	@bash infra/scripts/vault.sh encrypt

vault_view:
	@bash infra/scripts/vault.sh view
