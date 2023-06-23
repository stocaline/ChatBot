import { Text, View} from 'react-native';
import { StyleSheet } from 'react-native';

export type MessagesProps = {
  _id: string,
  from: number,
  to: number,
  path: string,
  message: string,
  created_at: string,
}

export type ChatProps = {
  _id: string;
  title: string;
  messages: MessagesProps[];
  created_at: string,
}
type Props = {
  data: ChatProps;
}


export function Card({ data }: Props) {


  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {data.title}
          </Text>

        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    paddingLeft: 22,
    marginBottom: 8,
    borderRadius: 4
  },
  content: {
    flex: 1,
    padding: 22,
  },
  title: {
    fontSize: 15,
    lineHeight: 18,
    color: '#3D434D',
    fontWeight: 'bold',
  },
});