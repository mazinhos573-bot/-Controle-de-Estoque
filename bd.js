// bd.js

// Importando do CDN para funcionar direto no navegador
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    deleteDoc, 
    doc, 
    updateDoc, 
    onSnapshot, 
    query, 
    orderBy,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuração do Seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDTr6hR8jwGONeDRXa_8vPShBkw0mJVceM",
  authDomain: "contole-de-estoque-cdc.firebaseapp.com",
  databaseURL: "https://contole-de-estoque-cdc-default-rtdb.firebaseio.com",
  projectId: "contole-de-estoque-cdc",
  storageBucket: "contole-de-estoque-cdc.firebasestorage.app",
  messagingSenderId: "11141306715",
  appId: "1:11141306715:web:c3294ca3c337f5a01ea27e",
  measurementId: "G-WR3NG9LX8C"
};

// Inicializa o App e o Banco de Dados (Firestore)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COL_ITENS = "itens";
const COL_HIST = "historico";

/**
 * Escuta atualizações em tempo real da coleção de itens
 * @param {Function} callback Função executada quando os dados mudam
 */
export function ouvirItens(callback) {
    const q = query(collection(db, COL_ITENS), orderBy("nome"));
    return onSnapshot(q, (snapshot) => {
        const itens = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(itens);
    });
}

/**
 * Escuta atualizações em tempo real do histórico
 * @param {Function} callback 
 */
export function ouvirHistorico(callback) {
    const q = query(collection(db, COL_HIST), orderBy("dataTimestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
        const hist = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(hist);
    });
}

/**
 * Adiciona um novo item
 */
export async function adicionarItemBD(item) {
    try {
        await addDoc(collection(db, COL_ITENS), item);
        return true;
    } catch (e) {
        console.error("Erro ao adicionar:", e);
        return false;
    }
}

/**
 * Atualiza a quantidade de um item e registra no histórico
 */
export async function movimentarEstoqueBD(idItem, novaQtd, dadosHistorico) {
    try {
        const itemRef = doc(db, COL_ITENS, idItem);
        
        // 1. Atualiza o item
        await updateDoc(itemRef, { qtd: novaQtd });

        // 2. Cria o registro no histórico com Timestamp do servidor
        await addDoc(collection(db, COL_HIST), {
            ...dadosHistorico,
            dataTimestamp: serverTimestamp() // Garante a ordem correta cronológica
        });

        return true;
    } catch (e) {
        console.error("Erro ao movimentar:", e);
        throw e;
    }
}

/**
 * Remove um item do banco
 */
export async function deletarItemBD(id) {
    try {
        await deleteDoc(doc(db, COL_ITENS, id));
        return true;
    } catch (e) {
        console.error("Erro ao deletar:", e);
        return false;
    }
}
