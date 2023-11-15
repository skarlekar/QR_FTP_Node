#!/bin/bash


# Create directories
mkdir -p src tests/unit tests/integration data config

# Create .gitignore with common Node.js exclusions
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore
echo "*.log" >> .gitignore

# Create other necessary files
touch package.json
touch README.md
touch src/app.js

# Create empty test files (optional)
touch tests/unit/example.test.js
touch tests/integration/example.test.js

# Create config file (optional)
touch config/default.json

echo "Node.js project structure created successfully."

