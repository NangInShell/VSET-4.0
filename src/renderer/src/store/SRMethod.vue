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
    value: 'animejanaiV3_HD_L1',
    label: 'animejanaiV3_HD_L1',
  },
  {
    value: 'animejanaiV3_HD_L2',
    label: 'animejanaiV3_HD_L2',
  },
  {
    value: 'animejanaiV3_HD_L3',
    label: 'animejanaiV3_HD_L3',
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



export { SRMethod_options, VsmlrtTile_options, Inference_options, RealcuganModel_options,RealesrganModel_options,
    RealesrganScale_options};

</script>