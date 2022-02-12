#import
import bpy
import math
import os

#reset objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(True)

#background
bpy.context.scene.world.node_tree.nodes['Background'].inputs['Color'].default_value = (1, 1, 1, 1)

#camera
bpy.ops.object.camera_add(location=(0.0, 10.0, 0.0))
bpy.data.objects['Camera'].rotation_euler = (math.pi/2.0, 0.0, math.pi)

#material
material = bpy.data.materials.new('material')
material.diffuse_color = (1.0, 0.0, 0.0, 1.0)

#object
bpy.ops.mesh.primitive_cube_add(location=(2, 0, 0), size=1, rotation=(0, 0, 0))
bpy.context.object.data.materials.append( material )

#scene
scene = bpy.context.scene
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
bpy.data.scenes["Scene"].camera = bpy.data.objects['Camera']
bpy.data.scenes["Scene"].render.filepath = os.getenv('HOME') + '/hoge.png'
bpy.ops.render.render(write_still=True)