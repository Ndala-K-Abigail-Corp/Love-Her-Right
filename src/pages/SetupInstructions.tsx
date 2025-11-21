export default function SetupInstructions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔧</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Firebase Setup Required
          </h1>
          <p className="text-gray-600">
            Let's get your LoveHerRight app configured!
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              📝 Step 1: Create Firebase Project
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>
                Go to{' '}
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600"
                >
                  Firebase Console
                </a>
              </li>
              <li>Click "Add project" or select an existing project</li>
              <li>Follow the setup wizard</li>
            </ol>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-green-900 mb-4">
              🔐 Step 2: Enable Authentication
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-green-800">
              <li>In Firebase Console, go to "Authentication"</li>
              <li>Click "Get started"</li>
              <li>Enable "Email/Password" provider</li>
              <li>Enable "Google" provider</li>
            </ol>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">
              💾 Step 3: Create Firestore Database
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-purple-800">
              <li>Go to "Firestore Database"</li>
              <li>Click "Create database"</li>
              <li>Start in "Test mode" (for development)</li>
              <li>Choose a location closest to you</li>
            </ol>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-orange-900 mb-4">
              ⚙️ Step 4: Get Firebase Config
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-orange-800">
              <li>Click the gear icon (⚙️) → "Project settings"</li>
              <li>Scroll to "Your apps" section</li>
              <li>Click the Web icon ({`</>`}) to add a web app</li>
              <li>Register app (name it "LoveHerRight")</li>
              <li>Copy the firebaseConfig object</li>
            </ol>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              📄 Step 5: Update .env File
            </h2>
            <div className="space-y-3 text-red-800">
              <p>Create a <code className="bg-red-100 px-2 py-1 rounded">.env</code> file in the project root:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456`}
              </pre>
              <p className="text-sm">
                ⚠️ <strong>Important:</strong> No quotes around values!
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🚀 Step 6: Restart Dev Server
            </h2>
            <div className="space-y-2 text-gray-800">
              <p>After updating the .env file:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Stop the current dev server (Ctrl+C)</li>
                <li>Run: <code className="bg-gray-200 px-2 py-1 rounded">pnpm dev</code></li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-primary-100 to-pink-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">📚 Need More Help?</h3>
          <p className="text-gray-700 text-sm">
            Check <code className="bg-white px-2 py-1 rounded">QUICKSTART.md</code> in the project root for detailed instructions.
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            I've Updated .env - Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
