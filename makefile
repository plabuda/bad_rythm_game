
#region Configurations
ifeq ($(f), d)
CONFIG = debug
else
CONFIG = release
endif
#endregion

#region itch.io
ACCOUNT = nora-sellisa
PROJECT = bad-rythm-game
CHANNEL = make-build

BUTLER_PATH = $(ACCOUNT)/$(PROJECT):$(CHANNEL)
#endregion

#region Directories
OUT = out
BIN = bin
OUTDIR = $(OUT)/$(CONFIG)
#endregion



$(OUTDIR)/$(BIN)/index.html: local/shell.html $(OUTDIR)/$(BIN)/ui.js $(OUTDIR)/$(BIN)/worker.js | $(OUTDIR)
	cp $< $@

$(OUTDIR)/$(BIN)/ui.js: ui/main.js | $(OUTDIR)
	cp $< $@

$(OUTDIR)/$(BIN)/worker.js: worker/main.js | $(OUTDIR)
	cp $< $@

$(OUTDIR)/game.zip: $(OUTDIR)/$(BIN)/index.html | $(OUTDIR)
	cd $(OUTDIR)/$(BIN) && zip ../game.zip -r *

#region Dependencies
$(OUTDIR):
	mkdir -p $@/$(BIN) $(OUT_DEP_DIRECTORIES)

.PHONY:
host: $(OUTDIR)/$(BIN)/index.html
	konsole -e python3 -m http.server --directory $(OUTDIR)/$(BIN) 8000 &

.PHONY:
clean:
	rm -rf $(OUT)

.PHONY:
package: $(OUTDIR)/game.zip

.PHONY:
publish: $(OUTDIR)/game.zip
ifeq ($(f), d)
	$(error Trying to publish a Debug build!)
else
	butler push $< $(BUTLER_PATH)
endif

.PHONY:
status:
	butler status $(BUTLER_PATH)

.PHONY:
itch:	
	python -m webbrowser https://$(ACCOUNT).itch.io/$(PROJECT)