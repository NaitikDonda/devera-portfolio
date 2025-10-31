import { initializeApp, cert, getApps, App, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Debug log environment variables
console.log('FIREBASE_SERVICE_ACCOUNT_KEY exists:', !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Type for Firebase Admin service account
interface FirebaseServiceAccount extends ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

// Parse the service account key from environment variables
let serviceAccount: FirebaseServiceAccount;

try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined in environment variables');
  }
  
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  console.log('Firebase project ID:', serviceAccount.project_id);
} catch (error) {
  console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', error);
  throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY in environment variables');
}

// Initialize Firebase Admin
let app: App;
let db: Firestore;

if (!getApps().length) {
  try {
    console.log('Initializing Firebase Admin...');
    
    const config = {
      credential: cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, '\n')
      } as ServiceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    };
    
    console.log('Firebase config:', {
      ...config,
      credential: { ...config.credential, privateKey: '***' } // Don't log the full private key
    });
    
    app = initializeApp(config);
    db = getFirestore(app);
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    throw error; // Re-throw to prevent silent failures
  }
} else {
  app = getApps()[0];
  db = getFirestore(app);
  console.log('Using existing Firebase app instance');
}

export { db };
