#!/bin/bash

echo "🚗 AutoAni - Setting up development environment..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your configuration."
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Install admin dependencies
echo "📦 Installing admin dependencies..."
cd admin && npm install && cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Start MongoDB (or use Docker)"
echo "3. Run 'npm run dev' to start all services"
echo ""
echo "Or use Docker:"
echo "docker-compose up -d"
echo ""
echo "Access points:"
echo "- Website: http://localhost:3000"
echo "- Admin: http://localhost:3001"
echo "- API: http://localhost:5000"
echo "- API Docs: http://localhost:5000/api-docs"
