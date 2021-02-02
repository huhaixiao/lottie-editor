import { useResetRecoilState } from 'recoil'
import { status, lottieCurrentTime, controllerCurrentTime } from '../atoms'

export function useReset() {
  const resetStatus = useResetRecoilState(status)
  const resetLottieCurrentTime = useResetRecoilState(lottieCurrentTime)
  const resetControllerCurrentTime = useResetRecoilState(controllerCurrentTime)

  return function () {
    resetStatus()
    resetLottieCurrentTime()
    resetControllerCurrentTime()
  }
}