// Mesh Standard Material
/// 物理ベースのレンダリングマテリアル
// Grid Sea
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";
import { Mesh } from "three";

window.addEventListener("DOMContentLoaded", () => {
  // レンダラーの設定。
  const RENDER = new THREE.WebGLRenderer();

  /// レンダラーのサイズを決める(画面の大きさ)
  /// 必ずしも画面いっぱいである必要はない。
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  /// レンダラーにサイズを設定。
  RENDER.setSize(WIDTH, HEIGHT);

  /// canvasをbodyに追加する。
  document.body.appendChild(RENDER.domElement);

  // シーンの追加
  const SCENE = new THREE.Scene();

  // バックグラウンドカラーの設定
  SCENE.background = new THREE.Color(0xffffff);

  // カメラの設定
  const CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
  /// カメラの位置を設定
  /// 500だと遠くなる。
  CAMERA.position.set(0, 0, 100);

  // 検証用カメラの設定
  //const TEST_CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
  //TEST_CAMERA.position.set(100, 150, 100);
  //TEST_CAMERA.lookAt(new THREE.Vector3(0, 0, 0));

  /*
  // 座標検証用補助線の作成
  const PLANE1 = new THREE.GridHelper(500);
  SCENE.add(PLANE1);
  const PLANE2 = new THREE.AxesHelper(200);
  SCENE.add(PLANE2);
  */

  // ジオメトリの作成
  /// Boxジオメトリーの作成
  let box_size = 10;
  let box_mesh: Mesh[] = [];
  [...Array(20).keys()].forEach((x) => {
    [...Array(20).keys()].forEach((y) => {
      const Box_GEOMETRY = new THREE.BoxBufferGeometry(
        box_size,
        box_size,
        box_size
      );
      /// Boxマテリアルの作成
      const Box_MATERIAL = new THREE.MeshStandardMaterial({
        color: 0x6699ff,
        roughness: 0.5,
        metalness: 1.0,
      });
      /// Boxメッシュの作成
      const Box_MESH = new THREE.Mesh(Box_GEOMETRY, Box_MATERIAL);

      Box_MESH.position.set(-80 + x * box_size,-80 + y * box_size, 0);
      SCENE.add(Box_MESH);
      box_mesh.push(Box_MESH);
    });
  });
  // console.log(box_mesh.length);

  //  検証 -100はいったいどこ？
  /// テスト用ジオメトリーの作成
  /*
  const Box_Test_GEOMETRY = new THREE.BoxBufferGeometry(
    box_size,
    box_size,
    box_size
  );
  /// Boxマテリアルの作成
  const Box_Test_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0x6699ff,
    roughness: 1.0,
    metalness: 1.0,
  });
  /// Boxメッシュの作成
  const Box_Test_MESH = new THREE.Mesh(Box_Test_GEOMETRY, Box_Test_MATERIAL);

  Box_Test_MESH.position.set(-80, 0, 0);

  SCENE.add(Box_Test_MESH);
  */

  // 光源設定
  // ライトの配置
  /// 平行光源の作成
  const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xffffff, 1);
  DIRECTIONAL_LIGHT.position.set(1, 1, 1);
  SCENE.add(DIRECTIONAL_LIGHT);

  // 球体と点光源を作成
  /// 光源のもととなる球体の作成
  const SPHERE_GEOMETRY_LIGHT = new THREE.SphereBufferGeometry(1.5, 20, 10);
  const SPHERE_MATERIAL_LIGHT = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
  const SPHERE_MESH_LIGHT = new THREE.Mesh(
    SPHERE_GEOMETRY_LIGHT,
    SPHERE_MATERIAL_LIGHT
  );

  /// 点光源の作成
  const POINT_LIGHT1 = new THREE.PointLight(0xffffff, 2, 1000);

  /// 球体の点光源を作成(球体と点光源を組み合わせる)
  POINT_LIGHT1.add(SPHERE_MESH_LIGHT);

  /// 球体点光源の座標(0, 0, 1000)に配置
  POINT_LIGHT1.position.set(0, 0, 0);

  /// 球体点光源をシーンに追加
  SCENE.add(POINT_LIGHT1);

  const draw = (): void => {
    let time = Date.now();

    for(let count = 0; count < box_mesh.length; count++){
      const BOX_MESH = box_mesh[count];
      /// ずらして動かしたい場合
      ///BOX_MESH.rotation.x += Math.sin(count * 0.0001);
      BOX_MESH.rotation.x += Math.sin(20 * 0.0001);
    }

    POINT_LIGHT1.position.set(
      200 * Math.cos(time / 500),
      200 * Math.sin(time / 1000),
      200 * Math.sin(time / 500)
    );

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
    // 検証用シーンとカメラを表示
    //RENDER.render(SCENE, TEST_CAMERA);
    requestAnimationFrame(draw);
  };

  draw();
});
