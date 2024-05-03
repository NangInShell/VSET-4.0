import { spawn, spawnSync } from 'child_process'
import path from 'path'
import { app} from 'electron'
import { ref } from 'vue'

let child

export async function RunCommand(event, config_json): Promise<void> {

  const value = config_json['_value'];
  console.log(value)

  child = spawn(config_json['_value'], { shell: true })

  child.stdout.on('data', (data) => {
    event.sender.send('ffmpeg-output', data.toString())
  })

  child.stderr.on('data', (data) => {
   
    console.error(`stderr: ${data}`)
    
    event.sender.send('ffmpeg-output', data.toString())
  })

  child.on('close', (code) => {
    console.log(`����`)
  })
}







