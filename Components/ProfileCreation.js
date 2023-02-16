import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseName from './ChooseName'
import { Button, Text } from "react-native";
import ChooseAvatar from './ChooseAvatar';

const ProfileCreation = ({navigation}) => {
    const Stack = createNativeStackNavigator();
    return ( 
        <Stack.Navigator>
            <Stack.Screen name="ChooseName" component={ChooseName} options={{headerShown: false }}/>
            <Stack.Screen name="ChooseAvatar" component={ChooseAvatar} options={{ title:"Choose Your Avatar", headerTransparent:true }} />
        </Stack.Navigator>
    );
}
 
export default ProfileCreation;