var gg3d = {};

gg3d.createShader = function(gl, id)
{
    var shaderScript = document.getElementById(id);

    if (!shaderScript)
        return null;

    var source = shaderScript.textContent;
    var shader;
    switch(id)
    {
        case "vertex":
            shader = gl.createShader(gl.VERTEX_SHADER);
            break;

        case "fragment":
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            break;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.error("An error occurred compiling the "+ id + " shader: " + gl.getShaderInfoLog(shader));
        return null;
    }

  return shader;
};

gg3d.createShaderProgram = function(vertexShader, fragmentShader)
{
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
      console.error("Unable to initialize the shader program.");
    }

    return program;
};
