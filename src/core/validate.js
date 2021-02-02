// https://mattbas.gitlab.io/python-lottie/group__Lottie.html#lottie_Animation
export function validate(o) {
  const bodymovin_version = 'v' in o
  const frames_per_second = 'fr' in o
  const in_point = 'ip' in o
  const out_point = 'op' in o
  const name = 'nm' in o
  const width = 'w' in o
  const height = 'h' in o
  const assets = 'assets' in o

  return bodymovin_version
    && name
    && width
    && height
    && frames_per_second
    && in_point
    && out_point
    && assets
}