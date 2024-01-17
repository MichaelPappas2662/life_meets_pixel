clean:
	@echo "Cleaning up..."
	@find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
	@find . -name "package-lock.json" -exec rm -f '{}' +
	@find . -name "yarn.lock" -exec rm -f '{}' +
	@find . -name "dist" -type d -exec rm -rf '{}' +
	@find . -name ".turbo" -type d -exec rm -rf '{}' +
	@find . -name ".next" -type d -exec rm -rf '{}' +
	@echo "Clean up complete."
