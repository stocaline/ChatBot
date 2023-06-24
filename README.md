# ChatBot

# Instalando o projeto
Após o git clone, entre na pasta do projeto e rode o comando "yarn install"

## Configurções para os icones do app
#### Configuração para o Android
Abra o arquivo android/app/build.gradle e adicione o seguinte código:

`apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"P`

#### Configuração para o iOS
Abra o arquivo ios/{nome-do-projeto}/Info.plist e adicione as seguintes entradas:

`
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Fontisto.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>
`

Em seguida, abra o arquivo ios/{nome-do-projeto}.xcodeproj no Xcode. No painel esquerdo, selecione o seu projeto e,
em seguida, selecione o alvo do seu aplicativo. Vá para a guia "Build Phases" e expanda a seção "Copy Bundle Resources".
Certifique-se de que os arquivos de fonte do react-native-vector-icons estejam listados lá. Caso contrário, adicione-os 
manualmente clicando no botão "+" e selecionando os arquivos de fonte correspondentes.
