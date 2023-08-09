import uuid from "react-native-uuid";
import { toString } from "lodash";


class ChatBot {

    getDate() {
        const now = new Date();
        const options = { timeZone: 'America/Sao_Paulo' };
        const formattedDate = now.toLocaleString('pt-BR', options);
        return formattedDate
    }

    startMessage() {
        var message = "🙂Olá, \nTenho armazenadas as informações dos *Projetos* do Curso de ADS do Cesusc.\nSelecione uma das Fases e depois aquele Projeto que você quer informações. \n As opções disponiveis são...\n🗞️1.Projetos da *Fase 1*\n🗞️2.Projetos da *Fase 2*\n🗞️3.Projetos da *Fase 3*\n🗞️4.Projetos da *Fase 4*\n🗞️5.Projetos da *Fase 5*\n🗞️6.Projetos da *Fase 6*\n🗞️7.Projetos da *Concluídos*"
        const newMessage = {
            _id: toString(uuid.v4()),
            from: 1,
            to: 2,
            path: "",
            message: message,
            created_at: this.getDate(),
        }
        return newMessage

    }

    failedConection() {
        var message = "Ops, estou sem conexão no momento 😔 \n tente novamente mais tarde."
        const newMessage = {
            _id: toString(uuid.v4()),
            from: 1,
            to: 2,
            path: "",
            message: message,
            created_at: this.getDate(),
        }
        return newMessage
    }

    withoutKey() {
        var message = " 🔑*Você ainda não cadastrou uma chave*🔑, \n cadastre uma e tente novamente."
        const newMessage = {
            _id: toString(uuid.v4()),
            from: 1,
            to: 2,
            path: "",
            message: message,
            created_at: this.getDate(),
        }
        return newMessage
    }

    unknownMessage() {
        var message = "Desculpe, não entendi. Por favor, escolha uma opção válida."
        const newMessage = {
            _id: toString(uuid.v4()),
            from: 1,
            to: 2,
            path: "",
            message: message,
            created_at: this.getDate(),
        }
        return newMessage
    }


    verify(mensagem: string) {
        if (mensagem.toLowerCase() === "oi" || mensagem === "?") {
            return this.startMessage()
        } else if (mensagem.toLowerCase() === "primeira fase" || mensagem.toLowerCase() === "fase 1" || mensagem.toLowerCase() === "1") {
            return "api1"
        } else if (mensagem.toLowerCase() === "segunda fase" || mensagem.toLowerCase() === "fase 2" || mensagem.toLowerCase() === "2") {
            return "api2"
        } else if (mensagem.toLowerCase() === "terceira fase" || mensagem.toLowerCase() === "fase 3" || mensagem.toLowerCase() === "3") {
            return "api3"
        } else if (mensagem.toLowerCase() === "quarta fase" || mensagem.toLowerCase() === "fase 4" || mensagem.toLowerCase() === "4") {
            return "api4"
        } else if (mensagem.toLowerCase() === "quinta fase" || mensagem.toLowerCase() === "fase 5" || mensagem.toLowerCase() === "5") {
            return "api5"
        } else if (mensagem.toLowerCase() === "sexta fase" || mensagem.toLowerCase() === "fase 6" || mensagem.toLowerCase() === "6") {
            return "api6"
        } else {
            return "api" + mensagem
        }
    }
}


export { ChatBot }