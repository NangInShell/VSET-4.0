import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('srsettingconfig',()=>{

  const useSR = ref('true')
  const SRMethodValue = ref('Real_cugan')


  const RealcuganTileValue = ref('1')
  const RealcuganInferenceValue = ref('Cuda')
  const RealcuganModelValue = ref('pro-conservative-up2x')
  const RealcuganAlphaValue = ref(1)

  const RealesrganInferenceValue=ref('Cuda')
  const RealesrganModelValue = ref('animevideov3')
  const RealesrganTileValue = ref('1')
  const RealesrganScaleValue = ref('2')

  const Waifu2xInferenceValue=ref('Cuda')
  const Waifu2xModelValue = ref('anime_style_art_rgb_noise0')
  const Waifu2xTileValue = ref('1')


  return {
    useSR,
    SRMethodValue,

    RealcuganTileValue,
    RealcuganInferenceValue,
    RealcuganModelValue,
    RealcuganAlphaValue,

    RealesrganInferenceValue,
    RealesrganModelValue,
    RealesrganTileValue,
    RealesrganScaleValue,

    Waifu2xInferenceValue,
    Waifu2xModelValue,
    Waifu2xTileValue

  }
})