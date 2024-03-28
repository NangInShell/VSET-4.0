<script>
import { ref } from 'vue'
const value = ref(true)

const SRMethodValue=ref('Real_cugan')
const InferenceValue=ref('Cuda')

const RealcuganModelValue=ref('pro-conservative-up2x')

const SRMethod_options = [
  {
    value: 'Real_cugan',
    label: 'Real_cugan',
  },
  {
    value: 'Real_esrgan',
    label: 'Real_esrgan',
  },
  {
    value: 'Waifu2x',
    label: 'Waifu2x',
  }
]

const VsmlrtTile_options = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  }
]

const Inference_options = [
  {
    value: 'Cuda',
    label: 'Cuda',
  },
  {
    value: 'TRT',
    label: 'TensorRt',
  },
  {
    value: 'NCNN',
    label: 'NCNN',
  },
  {
    value: 'OV',
    label: 'OV',
  }
]

const RealcuganModel_options = [
  {
    value: 'pro-conservative-up2x',
    label: 'pro-conservative-up2x',
  },
  {
    value: 'pro-conservative-up3x',
    label: 'pro-conservative-up3x',
  },
  {
    value: 'pro-denoise3x-up2x',
    label: 'pro-denoise3x-up2x',
  },
  {
    value: 'pro-denoise3x-up3x',
    label: 'pro-denoise3x-up3x',
  },
  {
    value: 'pro-no-denoise3x-up2x',
    label: 'pro-no-denoise3x-up2x',
  },
  {
    value: 'pro-no-denoise3x-up3x',
    label: 'pro-no-denoise3x-up3x',
  },
  {
    value: 'up2x-latest-conservative',
    label: 'up2x-latest-conservative',
  },
  {
    value: 'up2x-latest-denoise1x',
    label: 'up2x-latest-denoise1x',
  },
  {
    value: 'up2x-latest-denoise2x',
    label: 'up2x-latest-denoise2x',
  },
  {
    value: 'up2x-latest-denoise3x',
    label: 'up2x-latest-denoise3x',
  },
  {
    value: 'up2x-latest-no-denoise',
    label: 'up2x-latest-no-denoise',
  },
  {
    value: 'up3x-latest-conservative',
    label: 'up3x-latest-conservative',
  },
  {
    value: 'up3x-latest-denoise3x',
    label: 'up3x-latest-denoise3x',
  },
  {
    value: 'up3x-latest-no-denoise',
    label: 'up3x-latest-no-denoise',
  },
  {
    value: 'up4x-latest-conservative',
    label: 'up4x-latest-conservative',
  },
  {
    value: 'up4x-latest-denoise3x',
    label: 'up4x-latest-denoise3x',
  },
  {
    value: 'up4x-latest-no-denoise',
    label: 'up4x-latest-no-denoise',
  },
]

const RealesrganModel_options = [
  {
    value: 'animevideov3',
    label: 'animevideov3',
  },
  {
    value: 'animevideo-xsx2',
    label: 'animevideo-xsx2',
  },
  {
    value: 'animevideo-xsx4',
    label: 'animevideo-xsx4',
  },
  {
    value: 'animejanaiV2L1',
    label: 'animejanaiV2L1',
  },
  {
    value: 'animejanaiV2L2',
    label: 'animejanaiV2L2',
  },
  {
    value: 'animejanaiV2L3',
    label: 'animejanaiV2L3',
  },
  {
    value: 'animejanaiV3-HD-L1',
    label: 'animejanaiV3-HD-L1',
  },
  {
    value: 'animejanaiV3-HD-L2',
    label: 'animejanaiV3-HD-L2',
  },
  {
    value: 'animejanaiV3-HD-L3',
    label: 'animejanaiV3-HD-L3',
  },
]

const RealesrganScale_options = [
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
]

const Waifu2xModel_options = [
{
    value: 'anime_style_art_rgb_noise0',
    label: 'anime_style_art_rgb_noise0',
  },
  {
    value: 'anime_style_art_rgb_noise1',
    label: 'anime_style_art_rgb_noise1',
  },
  {
    value: 'anime_style_art_rgb_noise2',
    label: 'anime_style_art_rgb_noise2',
  },
  {
    value: 'anime_style_art_rgb_noise3',
    label: 'anime_style_art_rgb_noise3',
  },
  {
    value: 'anime_style_art_rgb_scale2.0x',
    label: 'anime_style_art_rgb_scale2.0x',
  },
  {
    value: 'cunet_noise0',
    label: 'cunet_noise0',
  },
  {
    value: 'cunet_noise0_scale2.0x',
    label: 'cunet_noise0_scale2.0x',
  },
  {
    value: 'cunet_noise1',
    label: 'cunet_noise1',
  },
  {
    value: 'cunet_noise1_scale2.0x',
    label: 'cunet_noise1_scale2.0x',
  },
  {
    value: 'cunet_noise2',
    label: 'cunet_noise2',
  },
  {
    value: 'cunet_noise2_scale2.0x',
    label: 'cunet_noise2_scale2.0x',
  },
  {
    value: 'cunet_noise3',
    label: 'cunet_noise3',
  },
  {
    value: 'cunet_noise3_scale2.0x',
    label: 'cunet_noise3_scale2.0x',
  },
  {
    value: 'cunet_scale2.0x',
    label: 'cunet_scale2.0x',
  },
  {
    value: 'photo_noise0',
    label: 'photo_noise0',
  },
  {
    value: 'photo_noise0_scale2.0x',
    label: 'photo_noise0_scale2.0x',
  },
  {
    value: 'photo_noise1',
    label: 'photo_noise1',
  },
  {
    value: 'photo_noise1_scale2.0x',
    label: 'photo_noise1_scale2.0x',
  },
  {
    value: 'photo_noise2',
    label: 'photo_noise2',
  },
  {
    value: 'photo_noise2_scale2.0x',
    label: 'photo_noise2_scale2.0x',
  },
  {
    value: 'photo_noise3',
    label: 'photo_noise3',
  },
  {
    value: 'photo_noise3_scale2.0x',
    label: 'photo_noise3_scale2.0x',
  },
  {
    value: 'photo_scale2.0x',
    label: 'photo_scale2.0x',
  },
  {
    value: 'upconv_7_anime_noise0_scale2.0x',
    label: 'upconv_7_anime_noise0_scale2.0x',
  },
  {
    value: 'upconv_7_anime_noise1_scale2.0x',
    label: 'upconv_7_anime_noise1_scale2.0x',
  },
  {
    value: 'upconv_7_anime_noise2_scale2.0x',
    label: 'upconv_7_anime_noise2_scale2.0x',
  },
  {
    value: 'upconv_7_anime_noise3_scale2.0x',
    label: 'upconv_7_anime_noise3_scale2.0x',
  },
  {
    value: 'upconv_7_anime_scale2.0x',
    label: 'upconv_7_anime_scale2.0x',
  },
  {
    value: 'upconv_7_photo_noise0_scale2.0x',
    label: 'upconv_7_photo_noise0_scale2.0x',
  },
  {
    value: 'upconv_7_photo_noise1_scale2.0x',
    label: 'upconv_7_photo_noise1_scale2.0x',
  },
  {
    value: 'upconv_7_photo_noise2_scale2.0x',
    label: 'upconv_7_photo_noise2_scale2.0x',
  },
  {
    value: 'upconv_7_photo_noise3_scale2.0x',
    label: 'upconv_7_photo_noise3_scale2.0x',
  },
  {
    value: 'upconv_7_photo_scale2.0x',
    label: 'upconv_7_photo_scale2.0x',
  },
  {
    value: 'upresnet10_noise0_scale2.0x',
    label: 'upresnet10_noise0_scale2.0x',
  },
  {
    value: 'upresnet10_noise1_scale2.0x',
    label: 'upresnet10_noise1_scale2.0x',
  },
  {
    value: 'upresnet10_noise2_scale2.0x',
    label: 'upresnet10_noise2_scale2.0x',
  },
  {
    value: 'upresnet10_noise3_scale2.0x',
    label: 'upresnet10_noise3_scale2.0x',
  },
  {
    value: 'upresnet10_scale2.0x',
    label: 'upresnet10_scale2.0x',
  },
  {
    value: 'noise0',
    label: 'noise0',
  },
  {
    value: 'noise0_scale2x',
    label: 'noise0_scale2x',
  },
  {
    value: 'noise0_scale4x',
    label: 'noise0_scale4x',
  },
  {
    value: 'noise1',
    label: 'noise1',
  },
  {
    value: 'noise1_scale2x',
    label: 'noise1_scale2x',
  },
  {
    value: 'noise1_scale4x',
    label: 'noise1_scale4x',
  },
  {
    value: 'noise2',
    label: 'noise2',
  },
  {
    value: 'noise2_scale2x',
    label: 'noise2_scale2x',
  },
  {
    value: 'noise2_scale4x',
    label: 'noise2_scale4x',
  },
  {
    value: 'noise3',
    label: 'noise3',
  },
  {
    value: 'noise3_scale2x',
    label: 'noise3_scale2x',
  },
  {
    value: 'noise3_scale4x',
    label: 'noise3_scale4x',
  },
  {
    value: 'scale2x',
    label: 'scale2x',
  },
  {
    value: 'scale4x',
    label: 'scale4x',
  },
]


export { SRMethod_options, VsmlrtTile_options, Inference_options, RealcuganModel_options,RealesrganModel_options,
    RealesrganScale_options,Waifu2xModel_options};

</script>