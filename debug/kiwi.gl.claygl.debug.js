
const vText=`#define DIRECTIONAL_LIGHT_COUNT 1
#define SHADER_NAME standard
uniform mat4 worldViewProjection ;
uniform mat4 worldInverseTranspose ;
uniform mat4 world ;
uniform vec2 uvRepeat ;
uniform vec2 uvOffset ;
attribute vec3 position;
attribute vec2 texcoord;

#if defined(AOMAP_ENABLED)
attribute vec2 texcoord2;
#endif

attribute vec3 normal;
attribute vec4 tangent;

#ifdef VERTEX_COLOR
attribute vec4 a_Color;
varying vec4 v_Color;
#endif

attribute vec3 barycentric;

#ifdef SKINNING
attribute vec3 weight;
attribute vec4 joint;
uniform mat4 skinMatrix [JOINT_COUNT];
mat4 getSkinMatrix(float idx) {
    return skinMatrix[int(idx)];
}
#endif

varying vec2 v_Texcoord;
varying vec3 v_Normal;
varying vec3 v_WorldPosition;
varying vec3 v_Barycentric;
#if defined(PARALLAXOCCLUSIONMAP_ENABLED) || defined(NORMALMAP_ENABLED)
varying vec3 v_Tangent;
varying vec3 v_Bitangent;
#endif
#if defined(AOMAP_ENABLED)
varying vec2 v_Texcoord2;
#endif
void main()
{
    vec3 skinnedPosition = position;
    vec3 skinnedNormal = normal;
    vec3 skinnedTangent = tangent.xyz;
#ifdef SKINNING
    mat4 skinMatrixWS = getSkinMatrix(joint.x) * weight.x;
if (weight.y > 1e-4)
{
    skinMatrixWS += getSkinMatrix(joint.y) * weight.y;
}
if (weight.z > 1e-4)
{
    skinMatrixWS += getSkinMatrix(joint.z) * weight.z;
}
float weightW = 1.0-weight.x-weight.y-weight.z;
if (weightW > 1e-4)
{
    skinMatrixWS += getSkinMatrix(joint.w) * weightW;
}

    skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;
    skinnedNormal = (skinMatrixWS * vec4(normal, 0.0)).xyz;
    skinnedTangent = (skinMatrixWS * vec4(tangent.xyz, 0.0)).xyz;
#endif
    gl_Position = worldViewProjection * vec4(skinnedPosition, 1.0);
    v_Texcoord = texcoord * uvRepeat + uvOffset;
    v_WorldPosition = (world * vec4(skinnedPosition, 1.0)).xyz;
    v_Barycentric = barycentric;
    v_Normal = normalize((worldInverseTranspose * vec4(skinnedNormal, 0.0)).xyz);
#if defined(PARALLAXOCCLUSIONMAP_ENABLED) || defined(NORMALMAP_ENABLED)
    v_Tangent = normalize((worldInverseTranspose * vec4(skinnedTangent, 0.0)).xyz);
    v_Bitangent = normalize(cross(v_Normal, v_Tangent) * tangent.w);
#endif
#ifdef VERTEX_COLOR
    v_Color = a_Color;
#endif
#if defined(AOMAP_ENABLED)
    v_Texcoord2 = texcoord2;
#endif
}`;

const fText = `#extension GL_OES_standard_derivatives : enable
#extension GL_EXT_shader_texture_lod : enable
precision highp float;
precision highp int;
precision highp sampler2D;

#define DIRECTIONAL_LIGHT_COUNT 1
#define USE_METALNESS
#define USE_ROUGHNESS
#define PI 3.14159265358979
#define GLOSSINESS_CHANNEL 0
#define ROUGHNESS_CHANNEL 0
#define METALNESS_CHANNEL 1
uniform mat4 viewInverse ;

varying vec2 v_Texcoord;
varying vec3 v_Normal;
varying vec3 v_WorldPosition;
#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif
#if defined(PARALLAXOCCLUSIONMAP_ENABLED) || defined(NORMALMAP_ENABLED)
varying vec3 v_Tangent;
varying vec3 v_Bitangent;
#endif
#ifdef NORMALMAP_ENABLED
uniform sampler2D normalMap ;

#endif
#ifdef DIFFUSEMAP_ENABLED
uniform sampler2D diffuseMap ;

#endif
#ifdef SPECULARMAP_ENABLED
uniform sampler2D specularMap ;

#endif
#ifdef USE_ROUGHNESS
uniform float roughness ;

    #ifdef ROUGHNESSMAP_ENABLED
uniform sampler2D roughnessMap ;

    #endif
#else
uniform float glossiness ;

    #ifdef GLOSSINESSMAP_ENABLED
uniform sampler2D glossinessMap ;

    #endif
#endif
#ifdef METALNESSMAP_ENABLED
uniform sampler2D metalnessMap ;

#endif
#ifdef ENVIRONMENTMAP_ENABLED
uniform samplerCube environmentMap ;

    #ifdef PARALLAX_CORRECTED
uniform vec3 environmentBoxMin ;

uniform vec3 environmentBoxMax ;

    #endif
#endif
#ifdef BRDFLOOKUP_ENABLED
uniform sampler2D brdfLookup ;

#endif
#ifdef EMISSIVEMAP_ENABLED
uniform sampler2D emissiveMap ;

#endif
#ifdef SSAOMAP_ENABLED
uniform sampler2D ssaoMap ;

uniform vec4 viewport ;

#endif
#ifdef AOMAP_ENABLED
uniform sampler2D aoMap ;

uniform float aoIntensity ;

varying vec2 v_Texcoord2;
#endif
uniform vec3 color ;

uniform float alpha ;

#ifdef ALPHA_TEST
uniform float alphaCutoff ;

#endif
#ifdef USE_METALNESS
uniform float metalness ;

#else
uniform vec3 specularColor ;

#endif
uniform vec3 emission ;

uniform float emissionIntensity ;

uniform float lineWidth ;

uniform vec4 lineColor ;

varying vec3 v_Barycentric;
#ifdef ENVIRONMENTMAP_PREFILTER
uniform float maxMipmapLevel ;

#endif
#ifdef AMBIENT_LIGHT_COUNT
uniform vec3 ambientLightColor [AMBIENT_LIGHT_COUNT];


#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
uniform vec3 ambientSHLightColor [AMBIENT_SH_LIGHT_COUNT];

uniform vec3 ambientSHLightCoefficients [AMBIENT_SH_LIGHT_COUNT * 9];

vec3 calcAmbientSHLight(int idx, vec3 N) {
    int offset = 9 * idx;
    return ambientSHLightCoefficients[0]
        + ambientSHLightCoefficients[1] * N.x
        + ambientSHLightCoefficients[2] * N.y
        + ambientSHLightCoefficients[3] * N.z
        + ambientSHLightCoefficients[4] * N.x * N.z
        + ambientSHLightCoefficients[5] * N.z * N.y
        + ambientSHLightCoefficients[6] * N.y * N.x
        + ambientSHLightCoefficients[7] * (3.0 * N.z * N.z - 1.0)
        + ambientSHLightCoefficients[8] * (N.x * N.x - N.y * N.y);
}

#endif
#ifdef AMBIENT_CUBEMAP_LIGHT_COUNT
uniform vec3 ambientCubemapLightColor [AMBIENT_CUBEMAP_LIGHT_COUNT];

uniform samplerCube ambientCubemapLightCubemap [AMBIENT_CUBEMAP_LIGHT_COUNT];

uniform sampler2D ambientCubemapLightBRDFLookup [AMBIENT_CUBEMAP_LIGHT_COUNT];


#endif
#ifdef POINT_LIGHT_COUNT
uniform vec3 pointLightPosition [POINT_LIGHT_COUNT];

uniform float pointLightRange [POINT_LIGHT_COUNT];

uniform vec3 pointLightColor [POINT_LIGHT_COUNT];


#endif
#ifdef DIRECTIONAL_LIGHT_COUNT
uniform vec3 directionalLightDirection [DIRECTIONAL_LIGHT_COUNT];

uniform vec3 directionalLightColor [DIRECTIONAL_LIGHT_COUNT];


#endif
#ifdef SPOT_LIGHT_COUNT
uniform vec3 spotLightPosition [SPOT_LIGHT_COUNT];

uniform vec3 spotLightDirection [SPOT_LIGHT_COUNT];

uniform float spotLightRange [SPOT_LIGHT_COUNT];

uniform float spotLightUmbraAngleCosine [SPOT_LIGHT_COUNT];

uniform float spotLightPenumbraAngleCosine [SPOT_LIGHT_COUNT];

uniform float spotLightFalloffFactor [SPOT_LIGHT_COUNT];

uniform vec3 spotLightColor [SPOT_LIGHT_COUNT];


#endif
uniform float attenuationFactor ;

float lightAttenuation(float dist, float range)
{
    float attenuation = 1.0;
    attenuation = dist*dist/(range*range+1.0);
    float att_s = attenuationFactor;
    attenuation = 1.0/(attenuation*att_s+1.0);
    att_s = 1.0/(att_s+1.0);
    attenuation = attenuation - att_s;
    attenuation /= 1.0 - att_s;
    return clamp(attenuation, 0.0, 1.0);
}

float edgeFactor(float width)
{
    vec3 d = fwidth(v_Barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d * width, v_Barycentric);
    return min(min(a3.x, a3.y), a3.z);
}

vec3 RGBMDecode(vec4 rgbm, float range) {
  return range * rgbm.rgb * rgbm.a;
}

vec4 RGBMEncode(vec3 color, float range) {
    if (dot(color, color) == 0.0) {
        return vec4(0.0);
    }
    vec4 rgbm;
    color /= range;
    rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6)), 0.0, 1.0);
    rgbm.a = ceil(rgbm.a * 255.0) / 255.0;
    rgbm.rgb = color / rgbm.a;
    return rgbm;
}

vec4 decodeHDR(vec4 color)
{
#if defined(RGBM_DECODE) || defined(RGBM)
    return vec4(RGBMDecode(color, 51.5), 1.0);
#else
    return color;
#endif
}
vec4 encodeHDR(vec4 color)
{
#if defined(RGBM_ENCODE) || defined(RGBM)
    return RGBMEncode(color.xyz, 51.5);
#else
    return color;
#endif
}

vec4 sRGBToLinear(in vec4 value) {
    return vec4(mix(pow(value.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), value.rgb * 0.0773993808, vec3(lessThanEqual(value.rgb, vec3(0.04045)))), value.w);
}
vec4 linearTosRGB(in vec4 value) {
    return vec4(mix(pow(value.rgb, vec3(0.41666)) * 1.055 - vec3(0.055), value.rgb * 12.92, vec3(lessThanEqual(value.rgb, vec3(0.0031308)))), value.w);
}

#if defined(SPOT_LIGHT_SHADOWMAP_COUNT) || defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT) || defined(POINT_LIGHT_SHADOWMAP_COUNT)
#ifdef SPOT_LIGHT_SHADOWMAP_COUNT
uniform sampler2D spotLightShadowMaps [SPOT_LIGHT_SHADOWMAP_COUNT];

uniform mat4 spotLightMatrices [SPOT_LIGHT_SHADOWMAP_COUNT];

uniform float spotLightShadowMapSizes [SPOT_LIGHT_SHADOWMAP_COUNT];

#endif
#ifdef DIRECTIONAL_LIGHT_SHADOWMAP_COUNT
#if defined(SHADOW_CASCADE)
uniform sampler2D directionalLightShadowMaps [1];

uniform mat4 directionalLightMatrices [SHADOW_CASCADE];

uniform float directionalLightShadowMapSizes [1];

uniform float shadowCascadeClipsNear [SHADOW_CASCADE];

uniform float shadowCascadeClipsFar [SHADOW_CASCADE];

#else
uniform sampler2D directionalLightShadowMaps [DIRECTIONAL_LIGHT_SHADOWMAP_COUNT];

uniform mat4 directionalLightMatrices [DIRECTIONAL_LIGHT_SHADOWMAP_COUNT];

uniform float directionalLightShadowMapSizes [DIRECTIONAL_LIGHT_SHADOWMAP_COUNT];

#endif
#endif
#ifdef POINT_LIGHT_SHADOWMAP_COUNT
uniform samplerCube pointLightShadowMaps [POINT_LIGHT_SHADOWMAP_COUNT];

#endif
uniform bool shadowEnabled ;

#ifdef PCF_KERNEL_SIZE
uniform vec2 pcfKernel [PCF_KERNEL_SIZE];

#endif
float decodeFloat(const in vec4 color)
{
    const vec4 bitShifts = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
    return dot(color, bitShifts);
}

float tapShadowMap(sampler2D map, vec2 uv, float z){
    vec4 tex = texture2D(map, uv);
    return step(z, decodeFloat(tex) * 2.0 - 1.0);
}
float pcf(sampler2D map, vec2 uv, float z, float textureSize, vec2 scale) {
    float shadowContrib = tapShadowMap(map, uv, z);
    vec2 offset = vec2(1.0 / textureSize) * scale;
#ifdef PCF_KERNEL_SIZE
    
    return shadowContrib / float(PCF_KERNEL_SIZE + 1);
#else
    shadowContrib += tapShadowMap(map, uv+vec2(offset.x, 0.0), z);
    shadowContrib += tapShadowMap(map, uv+vec2(offset.x, offset.y), z);
    shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, offset.y), z);
    shadowContrib += tapShadowMap(map, uv+vec2(0.0, offset.y), z);
    shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, 0.0), z);
    shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, -offset.y), z);
    shadowContrib += tapShadowMap(map, uv+vec2(offset.x, -offset.y), z);
    shadowContrib += tapShadowMap(map, uv+vec2(0.0, -offset.y), z);
    return shadowContrib / 9.0;
#endif
}
float pcf(sampler2D map, vec2 uv, float z, float textureSize) {
    return pcf(map, uv, z, textureSize, vec2(1.0));
}
float chebyshevUpperBound(vec2 moments, float z){
    float p = 0.0;
    z = z * 0.5 + 0.5;
    if (z <= moments.x) {
        p = 1.0;
    }
    float variance = moments.y - moments.x * moments.x;
    variance = max(variance, 0.0000001);
    float mD = moments.x - z;
    float pMax = variance / (variance + mD * mD);
    pMax = clamp((pMax-0.4)/(1.0-0.4), 0.0, 1.0);
    return max(p, pMax);
}
float computeShadowContrib(
    sampler2D map, mat4 lightVPM, vec3 position, float textureSize, vec2 scale, vec2 offset
) {
    vec4 posInLightSpace = lightVPM * vec4(position, 1.0);
    posInLightSpace.xyz /= posInLightSpace.w;
    float z = posInLightSpace.z;
    if(all(greaterThan(posInLightSpace.xyz, vec3(-0.99, -0.99, -1.0))) &&
        all(lessThan(posInLightSpace.xyz, vec3(0.99, 0.99, 1.0)))){
        vec2 uv = (posInLightSpace.xy+1.0) / 2.0;
        #ifdef USE_VSM
            vec2 moments = texture2D(map, uv * scale + offset).xy;
            return chebyshevUpperBound(moments, z);
        #else
            return pcf(map, uv * scale + offset, z, textureSize, scale);
        #endif
    }
    return 1.0;
}
float computeShadowContrib(sampler2D map, mat4 lightVPM, vec3 position, float textureSize) {
    return computeShadowContrib(map, lightVPM, position, textureSize, vec2(1.0), vec2(0.0));
}
float computeShadowContribOmni(samplerCube map, vec3 direction, float range)
{
    float dist = length(direction);
    vec4 shadowTex = textureCube(map, direction);
#ifdef USE_VSM
    vec2 moments = shadowTex.xy;
    float variance = moments.y - moments.x * moments.x;
    float mD = moments.x - dist;
    float p = variance / (variance + mD * mD);
    if(moments.x + 0.001 < dist){
        return clamp(p, 0.0, 1.0);
    }else{
        return 1.0;
    }
#else
    return step(dist, (decodeFloat(shadowTex) + 0.0002) * range);
#endif
}

#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)
void computeShadowOfSpotLights(vec3 position, inout float shadowContribs[SPOT_LIGHT_COUNT] ) {
    float shadowContrib;
    
    
}
#endif
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
#ifdef SHADOW_CASCADE
void computeShadowOfDirectionalLights(vec3 position, inout float shadowContribs[DIRECTIONAL_LIGHT_COUNT]){
    float depth = (2.0 * gl_FragCoord.z - gl_DepthRange.near - gl_DepthRange.far)
                    / (gl_DepthRange.far - gl_DepthRange.near);
    float shadowContrib;
    shadowContribs[0] = 1.0;
    
    
}
#else
void computeShadowOfDirectionalLights(vec3 position, inout float shadowContribs[DIRECTIONAL_LIGHT_COUNT]){
    float shadowContrib;
    
    
}
#endif
#endif
#if defined(POINT_LIGHT_SHADOWMAP_COUNT)
void computeShadowOfPointLights(vec3 position, inout float shadowContribs[POINT_LIGHT_COUNT] ){
    vec3 lightPosition;
    vec3 direction;
    
    
}
#endif
#endif

vec3 parallaxCorrect(in vec3 dir, in vec3 pos, in vec3 boxMin, in vec3 boxMax) {
    vec3 first = (boxMax - pos) / dir;
    vec3 second = (boxMin - pos) / dir;
    vec3 further = max(first, second);
    float dist = min(further.x, min(further.y, further.z));
    vec3 fixedPos = pos + dir * dist;
    vec3 boxCenter = (boxMax + boxMin) * 0.5;
    return normalize(fixedPos - boxCenter);
}

vec3 ACESToneMapping(vec3 color)
{
    const float A = 2.51;
    const float B = 0.03;
    const float C = 2.43;
    const float D = 0.59;
    const float E = 0.14;
    return (color * (A * color + B)) / (color * (C * color + D) + E);
}

float G_Smith(float g, float ndv, float ndl)
{
    float roughness = 1.0 - g;
    float k = roughness * roughness / 2.0;
    float G1V = ndv / (ndv * (1.0 - k) + k);
    float G1L = ndl / (ndl * (1.0 - k) + k);
    return G1L * G1V;
}
vec3 F_Schlick(float ndv, vec3 spec) {
    return spec + (1.0 - spec) * pow(1.0 - ndv, 5.0);
}
float D_Phong(float g, float ndh) {
    float a = pow(8192.0, g);
    return (a + 2.0) / 8.0 * pow(ndh, a);
}
float D_GGX(float g, float ndh) {
    float r = 1.0 - g;
    float a = r * r;
    float tmp = ndh * ndh * (a - 1.0) + 1.0;
    return a / (PI * tmp * tmp);
}
#ifdef PARALLAXOCCLUSIONMAP_ENABLED
uniform float parallaxOcclusionScale ;

uniform float parallaxMaxLayers ;

uniform float parallaxMinLayers ;

uniform sampler2D parallaxOcclusionMap ;

mat3 transpose(in mat3 inMat)
{
    vec3 i0 = inMat[0];
    vec3 i1 = inMat[1];
    vec3 i2 = inMat[2];
    return mat3(
        vec3(i0.x, i1.x, i2.x),
        vec3(i0.y, i1.y, i2.y),
        vec3(i0.z, i1.z, i2.z)
    );
}
vec2 parallaxUv(vec2 uv, vec3 viewDir)
{
    float numLayers = mix(parallaxMaxLayers, parallaxMinLayers, abs(dot(vec3(0.0, 0.0, 1.0), viewDir)));
    float layerHeight = 1.0 / numLayers;
    float curLayerHeight = 0.0;
    vec2 deltaUv = viewDir.xy * parallaxOcclusionScale / (viewDir.z * numLayers);
    vec2 curUv = uv;
    float height = 1.0 - texture2D(parallaxOcclusionMap, curUv).r;
    for (int i = 0; i < 30; i++) {
        curLayerHeight += layerHeight;
        curUv -= deltaUv;
        height = 1.0 - texture2D(parallaxOcclusionMap, curUv).r;
        if (height < curLayerHeight) {
            break;
        }
    }
    vec2 prevUv = curUv + deltaUv;
    float next = height - curLayerHeight;
    float prev = 1.0 - texture2D(parallaxOcclusionMap, prevUv).r - curLayerHeight + layerHeight;
    return mix(curUv, prevUv, next / (next - prev));
}
#endif
void main() {
    vec4 albedoColor = vec4(color, alpha);
#ifdef VERTEX_COLOR
    albedoColor *= v_Color;
#endif
    vec3 eyePos = viewInverse[3].xyz;
    vec3 V = normalize(eyePos - v_WorldPosition);
    vec2 uv = v_Texcoord;
#if defined(PARALLAXOCCLUSIONMAP_ENABLED) || defined(NORMALMAP_ENABLED)
    mat3 tbn = mat3(v_Tangent, v_Bitangent, v_Normal);
#endif
#ifdef PARALLAXOCCLUSIONMAP_ENABLED
    uv = parallaxUv(v_Texcoord, normalize(transpose(tbn) * -V));
#endif
#ifdef DIFFUSEMAP_ENABLED
    vec4 texel = texture2D(diffuseMap, uv);
    #ifdef SRGB_DECODE
    texel = sRGBToLinear(texel);
    #endif
    albedoColor.rgb *= texel.rgb;
    #ifdef DIFFUSEMAP_ALPHA_ALPHA
    albedoColor.a *= texel.a;
    #endif
#endif
#ifdef USE_METALNESS
    float m = metalness;
    #ifdef METALNESSMAP_ENABLED
    float m2 = texture2D(metalnessMap, uv)[METALNESS_CHANNEL];
    m = clamp(m2 + (m - 0.5) * 2.0, 0.0, 1.0);
    #endif
    vec3 baseColor = albedoColor.rgb;
    albedoColor.rgb = baseColor * (1.0 - m);
    vec3 spec = mix(vec3(0.04), baseColor, m);
#else
    vec3 spec = specularColor;
#endif
#ifdef USE_ROUGHNESS
    float g = 1.0 - roughness;
    #ifdef ROUGHNESSMAP_ENABLED
    float g2 = 1.0 - texture2D(roughnessMap, uv)[ROUGHNESS_CHANNEL];
    g = clamp(g2 + (g - 0.5) * 2.0, 0.0, 1.0);
    #endif
#else
    float g = glossiness;
    #ifdef GLOSSINESSMAP_ENABLED
    float g2 = texture2D(glossinessMap, uv)[GLOSSINESS_CHANNEL];
    g = clamp(g2 + (g - 0.5) * 2.0, 0.0, 1.0);
    #endif
#endif
#ifdef SPECULARMAP_ENABLED
    spec *= sRGBToLinear(texture2D(specularMap, uv)).rgb;
#endif
    vec3 N = v_Normal;
#ifdef DOUBLE_SIDED
    if (dot(N, V) < 0.0) {
        N = -N;
    }
#endif
#ifdef NORMALMAP_ENABLED
    if (dot(v_Tangent, v_Tangent) > 0.0) {
        vec3 normalTexel = texture2D(normalMap, uv).xyz;
        if (dot(normalTexel, normalTexel) > 0.0) {            N = normalTexel * 2.0 - 1.0;
            tbn[1] = -tbn[1];
            N = normalize(tbn * N);
        }
    }
#endif
    vec3 diffuseTerm = vec3(0.0, 0.0, 0.0);
    vec3 specularTerm = vec3(0.0, 0.0, 0.0);
    float ndv = clamp(dot(N, V), 0.0, 1.0);
    vec3 fresnelTerm = F_Schlick(ndv, spec);
#ifdef AMBIENT_LIGHT_COUNT
    
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
    
#endif
#ifdef POINT_LIGHT_COUNT
#if defined(POINT_LIGHT_SHADOWMAP_COUNT)
    float shadowContribsPoint[POINT_LIGHT_COUNT];
    if(shadowEnabled)
    {
        computeShadowOfPointLights(v_WorldPosition, shadowContribsPoint);
    }
#endif
    
#endif
#ifdef DIRECTIONAL_LIGHT_COUNT
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
    float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
    if(shadowEnabled)
    {
        computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
    }
#endif
    {
        vec3 L = -normalize(directionalLightDirection[0]);
        vec3 lc = directionalLightColor[0];
        vec3 H = normalize(L + V);
        float ndl = clamp(dot(N, L), 0.0, 1.0);
        float ndh = clamp(dot(N, H), 0.0, 1.0);
        float shadowContrib = 1.0;
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
        if(shadowEnabled)
        {
            shadowContrib = shadowContribsDir[0];
        }
#endif
        vec3 li = lc * ndl * shadowContrib;
        diffuseTerm += li;
        specularTerm += li * fresnelTerm * D_Phong(g, ndh);
    }
#endif
#ifdef SPOT_LIGHT_COUNT
#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)
    float shadowContribsSpot[SPOT_LIGHT_COUNT];
    if(shadowEnabled)
    {
        computeShadowOfSpotLights(v_WorldPosition, shadowContribsSpot);
    }
#endif
    for(int i = 0; i < SPOT_LIGHT_COUNT; i++)
    {
        vec3 lightPosition = spotLightPosition[i];
        vec3 spotLightDirection = -normalize(spotLightDirection[i]);
        vec3 lc = spotLightColor[i];
        float range = spotLightRange[i];
        float a = spotLightUmbraAngleCosine[i];
        float b = spotLightPenumbraAngleCosine[i];
        float falloffFactor = spotLightFalloffFactor[i];
        vec3 L = lightPosition - v_WorldPosition;
        float dist = length(L);
        float attenuation = lightAttenuation(dist, range);
        L /= dist;
        float c = dot(spotLightDirection, L);
        float falloff;
        falloff = clamp((c - a) /( b - a), 0.0, 1.0);
        falloff = pow(falloff, falloffFactor);
        vec3 H = normalize(L + V);
        float ndl = clamp(dot(N, L), 0.0, 1.0);
        float ndh = clamp(dot(N, H), 0.0, 1.0);
        float shadowContrib = 1.0;
#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)
        if (shadowEnabled)
        {
            shadowContrib = shadowContribsSpot[i];
        }
#endif
        vec3 li = lc * attenuation * (1.0 - falloff) * shadowContrib * ndl;
        diffuseTerm += li;
        specularTerm += li * fresnelTerm * D_Phong(g, ndh);
    }
#endif
    vec4 outColor = albedoColor;
    outColor.rgb *= diffuseTerm;
    outColor.rgb += specularTerm;
#ifdef AMBIENT_CUBEMAP_LIGHT_COUNT
    vec3 L = reflect(-V, N);
    float rough2 = clamp(1.0 - g, 0.0, 1.0);
    float bias2 = rough2 * 5.0;
    vec2 brdfParam2 = texture2D(ambientCubemapLightBRDFLookup[0], vec2(rough2, ndv)).xy;
    vec3 envWeight2 = spec * brdfParam2.x + brdfParam2.y;
    vec3 envTexel2;
    
#endif
#ifdef ENVIRONMENTMAP_ENABLED
    vec3 envWeight = g * fresnelTerm;
    vec3 L = reflect(-V, N);
    #ifdef PARALLAX_CORRECTED
    L = parallaxCorrect(L, v_WorldPosition, environmentBoxMin, environmentBoxMax);
    #endif
    #ifdef ENVIRONMENTMAP_PREFILTER
    float rough = clamp(1.0 - g, 0.0, 1.0);
    float bias = rough * maxMipmapLevel;
    vec3 envTexel = decodeHDR(textureCubeLodEXT(environmentMap, L, bias)).rgb;
        #ifdef BRDFLOOKUP_ENABLED
    vec2 brdfParam = texture2D(brdfLookup, vec2(rough, ndv)).xy;
    envWeight = spec * brdfParam.x + brdfParam.y;
        #endif
    #else
    vec3 envTexel = textureCube(environmentMap, L).xyz;
    #endif
    outColor.rgb += envTexel * envWeight;
#endif
    float aoFactor = 1.0;
#ifdef SSAOMAP_ENABLED
    aoFactor = min(texture2D(ssaoMap, (gl_FragCoord.xy - viewport.xy) / viewport.zw).r, aoFactor);
#endif
#ifdef AOMAP_ENABLED
    aoFactor = min(1.0 - clamp((1.0 - texture2D(aoMap, v_Texcoord2).r) * aoIntensity, 0.0, 1.0), aoFactor);
#endif
    outColor.rgb *= aoFactor;
    vec3 lEmission = emission;
#ifdef EMISSIVEMAP_ENABLED
    lEmission *= texture2D(emissiveMap, uv).rgb;
#endif
    outColor.rgb += lEmission * emissionIntensity;
    if(lineWidth > 0.)
    {
        outColor.rgb = mix(outColor.rgb, lineColor.rgb, (1.0 - edgeFactor(lineWidth)) * lineColor.a);
    }
#ifdef ALPHA_TEST
    if (outColor.a < alphaCutoff) {
        discard;
    }
#endif
#ifdef TONEMAPPING
    outColor.rgb = ACESToneMapping(outColor.rgb);
#endif
#ifdef SRGB_ENCODE
    outColor = linearTosRGB(outColor);
#endif
    gl_FragColor = encodeHDR(outColor);
}`;

const gl = require('gl')(400,100);

const vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs,vText);
gl.compileShader(vs);

const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs,fText);
gl.compileShader(fs);

const program = gl.createProgram();
gl.attachShader(program,vs);
gl.attachShader(program,fs);
gl.linkProgram(program);

const a_n = gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);
const u_n = gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);

for(let i =0;i<a_n;i++){
    const info = gl.getActiveAttrib(program,i);
    const name = info.name;
}
const uniforms = [];
for(let i =0;i<u_n;i++){
    const info = gl.getActiveUniform(program,i);
    const name = info.name;
    uniforms.push(name);
}

const s="";