import { reactive } from "vue";
/**
 * 用户的声音对象
 */
interface Volume {
  [key: string]: any
}
const VoiceLevel: Volume = reactive({
  '':0
})
export  {
  VoiceLevel,
  Volume
}
